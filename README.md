# samlichlyter.com

Personal site. Currently an "under construction" page, built to grow into project
statuses, a small image gallery and an about page.

**Stack:** [Astro](https://astro.build) (static output, plain CSS, no UI framework) ·
Terraform (S3 + CloudFront + Route53) · GitHub Actions (OIDC deploy).

## Develop

```sh
nvm use          # Node version from .nvmrc
npm ci
npm run dev      # http://localhost:4321
npm run check    # type-check
npm run build    # static site -> dist/
```

## Layout

```
src/config.ts          name, title, links (edit personal details here)
src/layouts/Base.astro shared <head> and page shell
src/components/        reusable components
src/pages/             one file per route
src/styles/global.css  black/white theme via CSS variables (follows browser light/dark)
src/content/projects/  future project-status Markdown (schema in src/content.config.ts)
terraform/             infrastructure (see below)
```

## Infrastructure

`terraform/` manages a **private** S3 bucket served through CloudFront (Origin Access
Control), Route53 apex A/AAAA records, security headers, and the GitHub OIDC provider and
least-privilege deploy role. It looks up the hosted zone and ACM certificate by domain
name, and reuses the existing OAC (`origin_access_control_id` in `terraform.tfvars`).
Other records in the hosted zone (mail, DKIM, etc.) are not managed.

State lives in the `samlichlyter.com-terraform` S3 bucket. Terraform is applied manually:

```sh
cd terraform
terraform init
terraform plan -out=tfplan   # review: nothing existing should be replaced
terraform apply tfplan
terraform output             # values for the GitHub variables below
```

## Deploy

Merging to `main` runs `.github/workflows/deploy.yml`: check, build, assume the AWS role
via OIDC, sync `dist/` to S3, invalidate CloudFront. Pull requests only build.

No secrets are used. Set these **repository variables** (Settings -> Secrets and
variables -> Actions -> Variables) from `terraform output`:

| Variable                     | Terraform output  |
| ---------------------------- | ----------------- |
| `AWS_ROLE_ARN`               | `deploy_role_arn` |
| `S3_BUCKET`                  | `bucket_name`     |
| `CLOUDFRONT_DISTRIBUTION_ID` | `distribution_id` |
