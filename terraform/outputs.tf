# None of these are secrets; set them as GitHub Actions repository *variables*.
output "deploy_role_arn" {
  description = "AWS_ROLE_ARN for the deploy workflow"
  value       = aws_iam_role.deploy.arn
}

output "bucket_name" {
  description = "S3_BUCKET for the deploy workflow"
  value       = aws_s3_bucket.bucket.id
}

output "distribution_id" {
  description = "CLOUDFRONT_DISTRIBUTION_ID for the deploy workflow"
  value       = aws_cloudfront_distribution.s3_distribution.id
}
