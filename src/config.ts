import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";

// Single place for personal details used across the site.
export const site = {
  name: "Sam Lichlyter",
  title: "Lead Software Engineer",
  url: "https://samlichlyter.com",
  description: "Sam Lichlyter's personal site. Currently under construction.",
  links: [
    // rel="me" on these links is what lets Mastodon verify this site on the profile.
    { label: "mastodon", href: "https://pdx.social/@samlichlyter", icon: faMastodon },
    { label: "github", href: "https://github.com/slichlyter12", icon: faGithub },
  ],
} as const;
