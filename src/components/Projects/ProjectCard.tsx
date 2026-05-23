import { useLetterScramble } from "../../hooks/useLetterScramble"
import { GitHubIcon, ExternalLinkIcon } from "../SocialIcons"
import type { Project } from "./data"

const glassCard = {
  background: `color-mix(in srgb, var(--color-lisek-brown) 18%, transparent)`,
  borderColor: `color-mix(in srgb, var(--color-lisek-brown) 30%, transparent)`,
}

const wipCard = {
  background: `color-mix(in srgb, var(--color-lisek-brown) 5%, transparent)`,
  borderColor: `color-mix(in srgb, var(--color-lisek-brown) 15%, transparent)`,
}

const darkOverlay = { background: `color-mix(in srgb, var(--color-lisek-dark) 70%, transparent)` }

export function ProjectCard({ project }: { project: Project }) {
  const { lettersRef, onMouseMove, onMouseEnter, onMouseLeave } = useLetterScramble()

  return (
    <div
      className="relative overflow-hidden flex flex-col gap-4 px-6 py-5 rounded-2xl border text-left"
      style={project.wip ? wipCard : glassCard}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={lettersRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none z-10 transition-opacity duration-300"
        style={{
          opacity: 0,
          color: `var(--color-lisek-sand)`,
          fontSize: "0.7rem",
          fontFamily: "monospace",
          fontWeight: 500,
          lineHeight: 1.2,
          wordBreak: "break-all",
          WebkitMaskImage: "radial-gradient(140px circle at var(--x, 50%) var(--y, 50%), white 20%, rgba(255,255,255,0.25), transparent)",
          maskImage: "radial-gradient(140px circle at var(--x, 50%) var(--y, 50%), white 20%, rgba(255,255,255,0.25), transparent)",
        }}
      />

      <div className="flex items-start justify-between gap-2 relative z-20 rounded-lg px-2 py-1 -mx-2" style={darkOverlay}>
        <h3
          className="font-righteous text-lg"
          style={{ color: project.wip ? `var(--color-lisek-brown)` : `var(--color-lisek-light)` }}
        >
          {project.name}
        </h3>
        {project.wip && (
          <span
            className="font-anton text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border shrink-0"
            style={{
              borderColor: `color-mix(in srgb, var(--color-lisek-brown) 30%, transparent)`,
              color: `color-mix(in srgb, var(--color-lisek-brown) 60%, transparent)`,
            }}
          >
            soon
          </span>
        )}
      </div>

      <p
        className="font-righteous text-sm leading-relaxed flex-1 relative z-20 rounded-lg px-2 py-1 -mx-2"
        style={{
          color: project.wip
            ? `color-mix(in srgb, var(--color-lisek-brown) 50%, transparent)`
            : `color-mix(in srgb, var(--color-lisek-light) 65%, transparent)`,
          ...darkOverlay,
        }}
      >
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 relative z-20 rounded-lg px-2 py-1 -mx-2" style={darkOverlay}>
          {project.tech.map(t => (
            <span
              key={t}
              className="font-righteous text-[11px] px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `color-mix(in srgb, var(--color-lisek-light) 30%, transparent)`,
                background: `color-mix(in srgb, var(--color-lisek-light) 6%, transparent)`,
                color: `var(--color-lisek-light)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {(project.github || project.live) && (
        <div className="flex gap-3 pt-1 relative z-20 rounded-lg px-2 py-1 -mx-2" style={darkOverlay}>
          {project.github && (
            <ProjectLink href={project.github} icon={<GitHubIcon />} label="GitHub" />
          )}
          {project.live && (
            <ProjectLink href={project.live} icon={<ExternalLinkIcon />} label="Live" />
          )}
        </div>
      )}
    </div>
  )
}

function ProjectLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-1.5 font-anton text-xs tracking-widest uppercase transition-colors duration-200"
      style={{ color: `var(--color-lisek-light)` }}
      onMouseEnter={e => (e.currentTarget.style.color = `var(--color-lisek-orange)`)}
      onMouseLeave={e => (e.currentTarget.style.color = `var(--color-lisek-light)`)}
    >
      {icon}
      {label}
    </a>
  )
}
