variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-1"
}

variable "project" {
  description = "Project name used for resource naming and tagging"
  type        = string
  default     = "lastoya-candleco"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "domain_name" {
  description = "Primary domain name (no protocol prefix)"
  type        = string
  default     = "lastoyacandleco.com"
}

variable "doppler_token" {
  description = "Doppler service token — set in terraform.tfvars (gitignored) or via TF_VAR_doppler_token env var. Never commit the real value."
  type        = string
  sensitive   = true
}

# cloudflare_api_token is intentionally NOT a Terraform variable.
# The Cloudflare provider reads CLOUDFLARE_API_TOKEN from the environment natively.
# Store it in Doppler and run: doppler run -- terraform plan
#
# cloudflare_zone_id is resolved at plan time via the cloudflare_zone data source.

