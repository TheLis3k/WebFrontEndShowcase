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
    name: "CreativeShape",
    description: "Marketing site for a Polish company selling NFC 3D-printed keychains linked to digital business cards. Features a drag-to-rotate 3D STL viewer and keychain catalogue.",
    tech: ["React", "TypeScript", "Vite", "CSS Custom Properties"],
    live: "https://creativeshape.pl",
  },
]
