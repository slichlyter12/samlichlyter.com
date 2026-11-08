import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";

// Single place for the personal details and copy used across the site.
export const site = {
  name: "Sam Lichlyter",
  role: "Lead engineer",
  company: "Nike World Headquarters",
  url: "https://samlichlyter.com",
  description: "Sam Lichlyter, lead engineer at Nike World Headquarters.",
  // Placeholder copy for the glass panel. Replace with the real intro.
  // Length budget: the panel grows downward and the wide layout does not scroll, so
  // keep the headline to about 2 lines and the body to about 6 lines (roughly 40 words).
  // Tested to still fit at 1280x800, 1440x900 and 1920x1080 with about double the
  // placeholder body, but with only a few pixels to spare at 1920x1080.
  intro: {
    headline: "Placeholder headline: one sentence about what you do.",
    body: "Placeholder text. Replace this with a short paragraph about yourself: what you build, what you care about, and what you are working on right now.",
  },
  links: [
    // rel="me" on these links is what lets Mastodon verify this site on the profile.
    { label: "Mastodon", href: "https://pdx.social/@samlichlyter", icon: faMastodon },
    { label: "GitHub", href: "https://github.com/slichlyter12", icon: faGithub },
  ],
} as const;
