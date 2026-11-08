# samlichlyter.com

Personal site: a photographic desk scene with a Polaroid of me and a frosted-glass panel
for a short intro and links. Built to grow into project statuses, a small image gallery
and an about page.

**Stack:** [Astro](https://astro.build) (static output, plain CSS, no UI framework) ·
Terraform (S3 + CloudFront + Route53) · GitHub Actions (OIDC deploy).

## How the page is built

- **Desk scene (image):** wood, leather mat, legal pad, MacBook corner and iPhone are one
  flat render from the Sketch design, `src/assets/desk.jpg`. Astro converts it to
  AVIF/WebP at several widths.
- **Polaroid and glass panel (live HTML/CSS):** real text and real links, so they stay
  accessible and the panel's `backdrop-filter` frosts the actual desk behind it.
- **Warm grade and film grain:** one full-screen CSS overlay so the live parts match the
  render.
- **Placement:** the desk is a 1440x900 "stage" that always covers the viewport, and live
  elements are placed in that design's pixel coordinates (`src/styles/layout.css`). On
  portrait or small screens the desk becomes a fixed backdrop and the Polaroid and panel
  stack in a scrolling column.

## Editing content

All copy lives in `src/config.ts`: name, role, company, the glass panel's headline and
paragraph (currently **placeholder text**), and the links. Keep `rel="me"` on the
Mastodon link; it is what lets Mastodon verify this site on the profile.

The handwriting font is [Caveat](https://fontsource.org/fonts/caveat) (OFL), imported in
`src/layouts/Base.astro`. To try another, install a different `@fontsource/*` package and
change the two imports and `--font-hand` in `src/styles/global.css`.

## Regenerating the desk image

The scene was designed in Sketch ("Round 8 – Consistent scale"). To change it, duplicate
that frame, delete the Polaroid, panel, film grain and warm grade layers, export the
frame as a 2880x1800 JPEG (quality ~90), and replace `src/assets/desk.jpg`. Keep the
grain out of the export (noise compresses badly); it is added back in CSS. The Sketch
file is not stored in this repo.

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
src/config.ts            name, role, copy, links (edit personal details here)
src/assets/              desk.jpg (scene render) and profile.jpg (processed by Astro)
src/layouts/Base.astro   shared <head>, fonts, page shell
src/components/          DeskScene, Polaroid, GlassPanel, Icon
src/pages/               index and 404
src/styles/global.css    tokens, base styles, grain
src/styles/layout.css    scene geometry and the portrait/mobile switch
src/content/projects/    future project-status Markdown (schema in src/content.config.ts)
terraform/               infrastructure (see below)
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
