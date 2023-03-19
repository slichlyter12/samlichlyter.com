variable "domain_name" {
  type        = string
  description = "The domain name of the website being deployed"
}

variable "bucket_name" {
  type        = string
  description = "Name of the bucket where the website will be hosted"
}

variable "certificate_arn" {
  type        = string
  description = "ARN of the ACM certificate to use"
}

variable "hosted_zone" {
  type        = string
  description = "ID of the Hosted Zone where domain should live"
}

variable "common_tags" {
  description = "Common tags applied to all components of this project"
}
