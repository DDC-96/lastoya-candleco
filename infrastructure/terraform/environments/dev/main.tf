locals {
  tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}


provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.tags
  }
}

# ACM certificates for CloudFront must always be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}

provider "doppler" {
  doppler_token = var.doppler_token
}

provider "cloudflare" {
  # Reads CLOUDFLARE_API_TOKEN from environment automatically.
  # Store the token in Doppler and run: doppler run -- terraform plan
}

# ── Cloudflare zone lookup ────────────────────────────────────────────────────
# Resolves the zone ID from the domain name so we don't need it as a variable.

data "cloudflare_zone" "main" {
  name = var.domain_name
}

# ── Cloudflare DNS — ACM validation records ───────────────────────────────────
# Terraform automatically creates the CNAME records Cloudflare needs to validate
# the ACM certificate. Once these propagate, ACM status moves to "Issued".

resource "cloudflare_record" "acm_validation" {
  for_each = {
    for opt in aws_acm_certificate.main.domain_validation_options : opt.domain_name => opt
  }

  zone_id = data.cloudflare_zone.main.id
  name    = each.value.resource_record_name
  type    = each.value.resource_record_type
  content = trimsuffix(each.value.resource_record_value, ".")
  ttl     = 60
  proxied = false
}

# ── Doppler secrets ───────────────────────────────────────────────────────────
# Fetch secrets from Doppler and expose them to Lambda via environment variables.

data "doppler_secrets" "main" {}

# ── ACM SSL Certificate ───────────────────────────────────────────────────────
# Must be in us-east-1 for CloudFront. DNS validation requires adding the
# CNAME records Terraform outputs to your Namecheap / Cloudflare DNS.

resource "aws_acm_certificate" "main" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.tags
}

# ── ACM validation (requires DNS records to be set first) ────────────────────

resource "aws_acm_certificate_validation" "main" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for r in cloudflare_record.acm_validation : r.hostname]

  depends_on = [cloudflare_record.acm_validation]
}

# ── DynamoDB — orders table ───────────────────────────────────────────────────

resource "aws_dynamodb_table" "orders" {
  name         = "${var.project}-orders-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.tags
}

# ── DynamoDB — products table ─────────────────────────────────────────────────

resource "aws_dynamodb_table" "products" {
  name         = "${var.project}-products-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "productId"

  attribute {
    name = "productId"
    type = "S"
  }

  tags = local.tags
}

# ── S3 — product image bucket ─────────────────────────────────────────────────

resource "aws_s3_bucket" "images" {
  bucket = "${var.project}-images-${var.environment}"

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "images" {
  bucket = aws_s3_bucket.images.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ── IAM — Lambda execution role ───────────────────────────────────────────────

resource "aws_iam_role" "lambda" {
  name = "${var.project}-lambda-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "dynamodb-access"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          aws_dynamodb_table.products.arn
        ]
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# ── Lambda functions ──────────────────────────────────────────────────────────

locals {
  lambda_env = {
    ENVIRONMENT    = var.environment
    ORDERS_TABLE   = aws_dynamodb_table.orders.name
    PRODUCTS_TABLE = aws_dynamodb_table.products.name
    IMAGES_BUCKET  = aws_s3_bucket.images.bucket
    FRONTEND_URL   = lookup(data.doppler_secrets.main.map, "FRONTEND_URL", "https://${var.domain_name}")
  }

  handlers = {
    products = { handler = "handlers.products.handler", description = "Product catalog CRUD" }
    orders   = { handler = "handlers.orders.handler",   description = "Order management" }
  }

}

# ── Lambda build ──────────────────────────────────────────────────────────────
# Runs infrastructure/scripts/build-lambda.sh at plan time: pip installs
# dependencies for the Linux x86_64 runtime, then copies handler source.
# Returns a hash so Terraform detects when source or deps change.

data "external" "lambda_build" {
  program = ["bash", "${abspath(path.root)}/../../../../infrastructure/scripts/build-lambda.sh"]

  query = {
    source_dir = abspath("${path.root}/../../../../backend")
    build_dir  = abspath("${path.root}/.lambda_builds/package")
  }
}

# Single zip shared across all Lambda functions — each declares its own handler path.
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.root}/.lambda_builds/package"
  output_path = "${path.root}/.lambda_builds/function.zip"

  depends_on = [data.external.lambda_build]
}

resource "aws_lambda_function" "handlers" {
  for_each = local.handlers

  function_name    = "${var.project}-${each.key}-${var.environment}"
  role             = aws_iam_role.lambda.arn
  handler          = each.value.handler
  runtime          = "python3.12"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  description      = each.value.description
  timeout          = 30
  memory_size      = 256

  environment {
    variables = local.lambda_env
  }
}

# ── API Gateway ───────────────────────────────────────────────────────────────

resource "aws_apigatewayv2_api" "main" {
  name          = "${var.project}-api-${var.environment}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://${var.domain_name}", "https://www.${var.domain_name}"]
    allow_methods = ["GET", "POST", "PATCH", "OPTIONS"]
    allow_headers = ["content-type", "authorization"]
    max_age       = 300
  }
}

resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = "/aws/apigateway/${var.project}-${var.environment}"
  retention_in_days = 30
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format = jsonencode({
      requestId      = "$context.requestId"
      ip             = "$context.identity.sourceIp"
      requestTime    = "$context.requestTime"
      httpMethod     = "$context.httpMethod"
      routeKey       = "$context.routeKey"
      status         = "$context.status"
      responseLength = "$context.responseLength"
      integrationError = "$context.integrationErrorMessage"
    })
  }
}

locals {
  routes = {
    "GET /products"      = "products"
    "GET /products/{id}" = "products"
    "POST /orders"       = "orders"
    "GET /orders/{id}"   = "orders"
  }
}

resource "aws_apigatewayv2_integration" "handlers" {
  for_each = toset(values(local.routes))

  api_id                 = aws_apigatewayv2_api.main.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.handlers[each.key].invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "routes" {
  for_each = local.routes

  api_id    = aws_apigatewayv2_api.main.id
  route_key = each.key
  target    = "integrations/${aws_apigatewayv2_integration.handlers[each.value].id}"
}

resource "aws_lambda_permission" "api_gateway" {
  for_each = local.handlers

  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.handlers[each.key].function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}

# ── S3 — frontend bucket (private, served via CloudFront OAC) ─────────────────

resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project}-frontend-${var.environment}"

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ── CloudFront OAC — lets CloudFront read from the private S3 bucket ──────────

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${var.project}-oac-${var.environment}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.main.arn
        }
      }
    }]
  })
}

# ── CloudFront Function — strips /api prefix before forwarding to API Gateway ──

resource "aws_cloudfront_function" "api_rewrite" {
  name    = "${var.project}-api-rewrite-${var.environment}"
  runtime = "cloudfront-js-2.0"
  publish = true

  code = <<-EOF
    function handler(event) {
      var request = event.request;
      request.uri = request.uri.replace(/^\/api/, '') || '/';
      return request;
    }
  EOF
}

# ── CloudFront distribution ───────────────────────────────────────────────────

locals {
  s3_origin_id  = "S3Frontend"
  apigw_origin_id = "APIGateway"
  apigw_domain  = trimsuffix(trimprefix(aws_apigatewayv2_stage.default.invoke_url, "https://"), "/")
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]
  price_class         = "PriceClass_100"

  # ── Origin 1: S3 frontend ──────────────────────────────────────────────────
  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  # ── Origin 2: API Gateway ──────────────────────────────────────────────────
  origin {
    domain_name = local.apigw_domain
    origin_id   = local.apigw_origin_id

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # ── Default behavior: S3 frontend ─────────────────────────────────────────
  default_cache_behavior {
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  # ── Ordered behavior: /api/* → API Gateway ────────────────────────────────
  ordered_cache_behavior {
    path_pattern           = "/api/*"
    target_origin_id       = local.apigw_origin_id
    viewer_protocol_policy = "https-only"
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0

    forwarded_values {
      query_string = true
      headers      = ["Authorization", "Content-Type", "x-admin-secret", "stripe-signature"]
      cookies { forward = "none" }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.api_rewrite.arn
    }
  }

  # ── SPA routing: 403/404 from S3 → index.html ─────────────────────────────
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  # ── SSL certificate (ACM, must be us-east-1) ───────────────────────────────
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.main.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  depends_on = [aws_acm_certificate_validation.main]

  tags = local.tags
}

# ── Cloudflare DNS — domain → CloudFront ──────────────────────────────────────
# proxied = false so CloudFront handles SSL directly (not Cloudflare proxy)

resource "cloudflare_record" "apex" {
  zone_id = data.cloudflare_zone.main.id
  name    = "@"
  type    = "CNAME"
  content = aws_cloudfront_distribution.main.domain_name
  ttl     = 1
  proxied = true
}

resource "cloudflare_record" "www" {
  zone_id = data.cloudflare_zone.main.id
  name    = "www"
  type    = "CNAME"
  content = aws_cloudfront_distribution.main.domain_name
  ttl     = 1
  proxied = true
}

# ── Cloudflare Email Routing — DMARC reports → personal inbox ─────────────────
# Enables Cloudflare Email Routing on the zone (auto-adds MX records).
# Destination address requires one-time verification via the email Cloudflare sends.

resource "cloudflare_email_routing_settings" "main" {
  zone_id = data.cloudflare_zone.main.id
  enabled = true
}

# Destination address must be verified manually in the Cloudflare dashboard:
# Email → Email Routing → Destination addresses → Add address → okta-developer@tutamail.com
# (Account-level API permission required to manage this via Terraform.)

resource "cloudflare_email_routing_rule" "dmarc_reports" {
  zone_id  = data.cloudflare_zone.main.id
  name     = "DMARC reports"
  enabled  = true
  priority = 1

  matcher {
    type  = "literal"
    field = "to"
    value = "dmarc-reports@${var.domain_name}"
  }

  action {
    type  = "forward"
    value = ["okta-developer@tutamail.com"]
  }

  depends_on = [cloudflare_email_routing_settings.main]
}

# ── Cloudflare DNS — email security ──────────────────────────────────────────
# SPF: hard-fail all senders — domain sends no email yet.
# DMARC: reject spoofed mail; aggregate reports go to dmarc-reports@.

resource "cloudflare_record" "spf" {
  zone_id = data.cloudflare_zone.main.id
  name    = "@"
  type    = "TXT"
  content = "v=spf1 -all"
  ttl     = 300
  proxied = false
}

resource "cloudflare_record" "dmarc" {
  zone_id = data.cloudflare_zone.main.id
  name    = "_dmarc"
  type    = "TXT"
  content = "v=DMARC1; p=reject; rua=mailto:dmarc-reports@${var.domain_name}; ruf=mailto:dmarc-reports@${var.domain_name}; fo=1"
  ttl     = 300
  proxied = false
}

# ── CloudWatch — Lambda error alarms ─────────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  for_each = local.handlers

  alarm_name          = "${var.project}-${each.key}-errors-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 60
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "Lambda ${each.key} error rate elevated"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = aws_lambda_function.handlers[each.key].function_name
  }
}

# ── CloudWatch — API Gateway 5xx alarm ───────────────────────────────────────

resource "aws_cloudwatch_metric_alarm" "api_5xx" {
  alarm_name          = "${var.project}-api-5xx-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "5XXError"
  namespace           = "AWS/ApiGateway"
  period              = 60
  statistic           = "Sum"
  threshold           = 10
  alarm_description   = "API Gateway 5xx errors elevated"
  treat_missing_data  = "notBreaching"

  dimensions = {
    ApiId = aws_apigatewayv2_api.main.id
    Stage = aws_apigatewayv2_stage.default.name
  }
}
