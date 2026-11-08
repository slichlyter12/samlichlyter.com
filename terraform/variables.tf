variable "domain_name" {
  type        = string
  description = "The domain name of the website being deployed"
}

variable "bucket_name" {
  type        = string
  description = "Name of the bucket where the website is hosted"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository (owner/name) allowed to deploy the site from its main branch"
}

variable "origin_access_control_id" {
  type        = string
  description = "ID of the existing CloudFront Origin Access Control for the S3 bucket"
}

variable "common_tags" {
  type        = map(string)
  description = "Tags applied to all resources in this project"
}
