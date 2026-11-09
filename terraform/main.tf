terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "samlichlyter.com-terraform"
    key    = "prod/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"

  default_tags {
    tags = var.common_tags
  }
}

# CloudFront certificates must live in us-east-1.
provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}

# Look up pre-existing resources by name instead of hardcoding IDs/ARNs.
data "aws_route53_zone" "this" {
  name = var.domain_name
}

data "aws_acm_certificate" "this" {
  provider = aws.acm_provider
  domain   = var.domain_name
  statuses = ["ISSUED"]
}
