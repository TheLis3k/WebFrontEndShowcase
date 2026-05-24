export type Project = {
  name: string
  description: string
  tech: string[]
  github?: string
  live?: string
  wip?: boolean
}

export const projects: Project[] = [
  {
    name: "WizytówkaWeb",
    description: "This portfolio site. Dark-themed, animation-heavy business card built with React 19 and a custom canvas comet flight system.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Canvas API"],
    github: "https://github.com/TheLis3k/WebFrontEndShowcase",
  },
  {
    name: "Evenciki.pl",
    description: "Event planning platform — create an event, share a link and gather responses from attendees. Mobile-first, bilingual (PL/EN).",
    tech: ["SvelteKit 5", "NestJS", "Drizzle ORM", "PostgreSQL", "TanStack Query", "Tailwind CSS", "Bun"],
    live: "https://evenciki.pl",
  },
  {
    name: "Restaurant Admin",
    description: "Full-stack restaurant management system with a public reservation/menu site and a role-based admin panel. Features JWT auth with rotating refresh tokens and invitation-based onboarding.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "TanStack Query", "Zustand", "Docker"],
    github: "https://github.com/TheLis3k/WizytowkaSandbox",
  },
  {
    name: "How Much Is My Hot Wheels",
    description: "Spring Boot REST API that scrapes eBay, Etsy, OLX, Vinted and the Hot Wheels Wiki to aggregate current valuations for die-cast collector cars.",
    tech: ["Java 21", "Spring Boot", "MongoDB", "JSoup", "Playwright", "Docker"],
    github: "https://github.com/TheLis3k/how-much-is-my-hot-wheels",
  },
  {
    name: "CreativeShape",
    description: "Marketing site for a Polish company selling NFC 3D-printed keychains linked to digital business cards. Features a drag-to-rotate 3D STL viewer and keychain catalogue.",
    tech: ["React", "TypeScript", "Vite", "CSS Custom Properties"],
    live: "https://creativeshape.pl",
  },
]
