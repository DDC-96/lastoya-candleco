output "api_endpoint" {
  description = "API Gateway invoke URL"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN attached to CloudFront"
  value       = aws_acm_certificate.main.arn
}

output "acm_dns_validation_records" {
  description = "CNAME records written to Cloudflare for ACM cert validation"
  value = {
    for opt in aws_acm_certificate.main.domain_validation_options : opt.domain_name => {
      name  = opt.resource_record_name
      type  = opt.resource_record_type
      value = opt.resource_record_value
    }
  }
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain — site accessible here before DNS propagates"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_distribution_id" {
  description = "Used by GitHub Actions to invalidate cache on deploy"
  value       = aws_cloudfront_distribution.main.id
}

output "frontend_bucket" {
  description = "S3 bucket — sync your Next.js build output here"
  value       = aws_s3_bucket.frontend.bucket
}

output "orders_table_name" {
  value = aws_dynamodb_table.orders.name
}

output "products_table_name" {
  value = aws_dynamodb_table.products.name
}

output "images_bucket" {
  value = aws_s3_bucket.images.bucket
}

output "lambda_function_arns" {
  value = { for k, v in aws_lambda_function.handlers : k => v.arn }
}
