resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name
  tags   = var.common_tags
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "bucket_website_config" {
  bucket = aws_s3_bucket.bucket.id
  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "bucket_cors_config" {
  bucket = aws_s3_bucket.bucket.id

  cors_rule {
    allowed_headers = ["Content-Length"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://${var.domain_name}"]
    max_age_seconds = 300
  }
}
