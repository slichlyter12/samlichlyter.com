import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Future home of project status entries: add Markdown files to src/content/projects/.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["idea", "active", "paused", "done"]),
    updated: z.coerce.date(),
  }),
});

export const collections = { projects };
