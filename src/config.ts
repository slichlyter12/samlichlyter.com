import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";

// Single place for the personal details and copy used across the site.
export const site = {
  name: "Sam Lichlyter",
  role: "Lead Innovation Software Engineer",
  url: "https://samlichlyter.com",
  description: "Sam Lichlyter, lead innovation software engineer.",
  about: [
    "I currently work as a lead software engineer in Technology Innovation at Nike’s World Headquarters in Beaverton, Oregon.",
    "In my free time I’m usually consuming all the Apple news blogs as well as checking in on what the indie iOS & macOS developers are up to on Mastodon.",
    "I also dabble in a little photography, both film and digital, and you can sometimes find me hiking around the forested trails around the greater Portland area trying to be more artsy than I actually am."
  ],
  links: [
    { label: "Mastodon", href: "https://pdx.social/@samlichlyter", icon: faMastodon, rel: "me" },
    { label: "GitHub",   href: "https://github.com/slichlyter12",      icon: faGithub }
  ]
} as const;
