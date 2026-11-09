# samlichlyter.com

Personal site: a handwritten one-pager on a single 16:9 "stage" — a circular profile
photo and a blue "find me" pane on the left, and the name, role, and a short about on
the right. All text is the Fineliner handwriting font, in light and dark themes that
follow the system. Built to grow into project statuses, a small image gallery and an
about page.

**Stack:** [Astro](https://astro.build) (static output, plain CSS, no UI framework) ·
Terraform (S3 + CloudFront + Route53) · GitHub Actions (OIDC deploy).

## How the page is built

- **16:9 stage:** the page is a 2560x1440 composition that always covers the viewport
  (cropping the edges on odd aspect ratios). Live elements sit in design-px coordinates
  scaled by one CSS variable (`--stage-u` = 1 design px), so the layout tracks the
  Sketch file.
- **Live HTML, no scene render:** everything is real text and real links, so it stays
  accessible; the "background" is just the theme's flat `--bg` color.
- **Theme:** three tokens — `--bg`, `--ink`, `--accent` — swap with
  `prefers-color-scheme` (light: `#fff` / `#000` / `#3271A1`; dark: `#000` / `#fff` /
  `#3F8DC9`). The entire find-me pane is monochrome `--accent`, as in the design.
- **Fallback:** on portrait, narrow, or very short screens the stage stops covering and
  the two panes stack into one centered scrolling column with rem-sized type (the media
  query in `src/styles/layout.css`).

## Editing content

All copy lives in `src/config.ts`: name, role, the three about paragraphs, and the
links. Keep `rel="me"` on the Mastodon link; it is what lets Mastodon verify this site
on the profile. The role and link labels render lowercase via CSS, so keep them in
natural case in the config.

The handwriting font is **Fineliner** (variable, weight 100–900; the user's own
`SamType.ttf` — free to use and embed), self-hosted as a Latin-subset WOFF2 at
`src/assets/fonts/Fineliner.woff2` (preloaded in `Base.astro`, declared in
`src/styles/global.css`). Keep the source TTF out of the build; regenerate the subset
with `pyftsubset` if the glyph set changes.

## Regenerating the profile image

The design's circle is the exact center of the 3:2 source photo (a coffee mug by a
window). The original file available is only 640x433, so the current
`src/assets/profile.jpg` is the largest possible square center crop of it (433x433):

```sh
sips -c 433 433 "path/to/original.jpg" --out src/assets/profile.jpg   # -c = center crop
```

If a higher-resolution original (ideally 1200–1600px) becomes available, re-crop to a
square at that size — the circle renders with `border-radius: 50%` + `object-fit:
cover`, so any square source works.

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
src/config.ts            name, role, about, links (edit personal details here)
src/assets/              profile.jpg and fonts/Fineliner.woff2 (processed by Astro)
src/layouts/Base.astro   shared <head>, meta, page shell
src/components/          FindMePane, Icon
src/pages/               index and 404
src/styles/global.css    theme tokens, @font-face, base styles
src/styles/layout.css    stage geometry and the portrait/mobile switch
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
