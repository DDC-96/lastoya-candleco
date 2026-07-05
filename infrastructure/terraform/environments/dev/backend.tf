# ── Remote state backend ──────────────────────────────────────────────────────
# IMPORTANT: Do not uncomment this until after running:
  # cd infrastructure/terraform/bootstrap && terraform init && terraform apply

# Then run: terraform init -migrate-state
# This moves local state into the S3 bucket for team sharing + safety.

terraform {
  backend "s3" {
    bucket         = "lastoya-candleco-terraform-state"
    key            = "environments/dev/terraform.tfstate"
    region         = "us-west-1"
    dynamodb_table = "lastoya-candleco-terraform-locks"
    encrypt        = true
  }
}
