export const siteConfig = {
  name: "Samin Israk",
  role: "Full Stack Developer",
  shortBio:
    "Full Stack Developer crafting modern, performant web applications with React, Next.js, and Node.js.",
  longBio:
    "I design and build end-to-end web products — from data models and APIs to accessible, fast-loading interfaces. I care about typography, small details, and shipping.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  email: "hello@saminisrak.dev",
  twitterHandle: "@samin1362",
  keywords: [
    "Samin Israk",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Portfolio",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Samin1362", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/samin-israk/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:hello@saminisrak.dev", icon: "mail" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
export type SocialItem = (typeof siteConfig.socials)[number];
