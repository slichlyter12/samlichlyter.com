import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://samlichlyter.com",
  output: "static",
  // Emit /foo/index.html so CloudFront can serve directory-style URLs.
  build: { format: "directory" },
});
