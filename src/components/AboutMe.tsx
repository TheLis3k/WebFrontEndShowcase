import { useRef } from "react"
import { GitHubIcon, LinkedInIcon, DiscordIcon, EmailIcon } from "./SocialIcons"
import { useParticles } from "../hooks/useParticles"
import Projects from "./Projects"
import type { ComponentType } from "react"

type Social = {
  label: string
  value: string
  href: string
  Icon: ComponentType
}

const emailParts = ["ksawery2k19", "gmail.com"] as const
const getMailto = () => `mailto:${emailParts[0]}@${emailParts[1]}`

const socials: Social[] = [
  { label: "GitHub",   value: "TheLis3k",                         href: "https://github.com/TheLis3k",            Icon: GitHubIcon   },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/kc05", href: "https://www.linkedin.com/in/kc05",       Icon: LinkedInIcon },
  { label: "Discord",  value: "TheLis3k",                         href: "https://discord.com/users/thelis3k",     Icon: DiscordIcon  },
  { label: "E-mail",   value: `${emailParts[0]}@${emailParts[1]}`, href: "",                                      Icon: EmailIcon    },
]

const softSkills = ["Fast Learner", "Communication", "Problem Solving", "Analytical Thinking", "Teamwork", "Professional Yellow Duck", "Data Manipulation", "Technical Communication Translator", "Kaizen"]

const techSkills = ["JavaScript", "Java", "React", "Angular", "Spring Boot", "Linux", "Bash", "Playwright", "Python", "Automated Testing", "Git", "Product Analytics", "Business Data Collection", "AI Agents / Skills / Rules"]

const glassCard = {
  background: `color-mix(in srgb, var(--color-lisek-brown) 18%, transparent)`,
  borderColor: `color-mix(in srgb, var(--color-lisek-brown) 30%, transparent)`,
}

function onEnter(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = `color-mix(in srgb, var(--color-lisek-orange) 50%, transparent)`
  e.currentTarget.style.background  = `color-mix(in srgb, var(--color-lisek-orange) 8%, transparent)`
}

function onLeave(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = glassCard.borderColor
  e.currentTarget.style.background  = glassCard.background
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-anton text-xs tracking-widest text-lisek-brown uppercase mb-4">{children}</p>
  )
}

function SkillBadge({ label, orange = false }: { label: string; orange?: boolean }) {
  return (
    <span
      className="font-righteous text-xs px-3 py-1.5 rounded-full border"
      style={{
        borderColor: orange
          ? `color-mix(in srgb, var(--color-lisek-orange) 40%, transparent)`
          : `color-mix(in srgb, var(--color-lisek-brown) 40%, transparent)`,
        background: orange
          ? `color-mix(in srgb, var(--color-lisek-orange) 8%, transparent)`
          : `color-mix(in srgb, var(--color-lisek-brown) 12%, transparent)`,
        color: orange ? `var(--color-lisek-orange)` : `var(--color-lisek-light)`,
      }}
    >
      {label}
    </span>
  )
}

export default function AboutMe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticles(canvasRef)

  return (
    <section
      id="next-section"
      className="w-full h-full flex flex-col items-center pt-32 overflow-y-auto"
      style={{
        background: `radial-gradient(ellipse 60% 18% at 50% 0%, color-mix(in srgb, var(--color-lisek-orange) 5%, transparent) 0%, var(--color-lisek-dark) 100%)`,
        maskImage: `linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
      <div className="text-center z-10 w-full max-w-4xl px-6 pb-16">
        <h2 className="font-righteous text-4xl md:text-6xl text-lisek-light mb-4">Hi, I'm TheLis3k</h2>
        <p className="font-anton text-xl text-lisek-brown tracking-widest uppercase mb-16">
          ABOUT ME
        </p>

        {/* Bio */}
        <div className="mb-5 px-8 py-6 rounded-2xl border text-left" style={glassCard}>
          <p className="font-righteous text-lisek-light text-base md:text-lg leading-relaxed">
            I'm <strong className="text-lisek-orange">TheLis3k</strong> (Ksawery) — a part-time IT student at{" "}
            <a href="https://www.linkedin.com/school/pjatk" target="_blank" rel="noopener noreferrer" className="text-lisek-orange hover:underline">PJATK</a>{" "}
            and a passionate programmer.
            I work at{" "}
            <a href="https://www.linkedin.com/company/talentech-group-site" target="_blank" rel="noopener noreferrer" className="text-lisek-orange hover:underline">Talentech</a>,
            where I develop the product{" "}
            <a href="https://talentech.com/products/hr-system/employee-feedback/features/" target="_blank" rel="noopener noreferrer" className="text-lisek-orange hover:underline">Weekli</a>,
            and across the company I build automations
            for client migrations, automate internal processes, and help with system integrations.
          </p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="px-6 py-5 rounded-2xl border text-left" style={glassCard}>
            <SectionLabel>Soft Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {softSkills.map(s => <SkillBadge key={s} label={s} />)}
            </div>
          </div>
          <div className="px-6 py-5 rounded-2xl border text-left" style={glassCard}>
            <SectionLabel>Tech Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {techSkills.map(s => <SkillBadge key={s} label={s} orange />)}
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {socials.map(({ label, value, href, Icon }) => {
            const isEmail = label === "E-mail"
            return (
              <a
                key={label}
                href={isEmail ? undefined : href}
                onClick={isEmail ? () => { window.location.href = getMailto() } : undefined}
                target={isEmail ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 cursor-pointer"
                style={glassCard}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <span className="text-lisek-orange shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </span>
                <div className="text-left min-w-0">
                  <p className="font-anton text-xs tracking-widest text-lisek-brown uppercase mb-0.5">{label}</p>
                  <p className="font-righteous text-lisek-light text-sm truncate">{value}</p>
                </div>
              </a>
            )
          })}
        </div>

        {/* CV + AI-readable Markdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <button
            disabled
            className="font-anton tracking-widest uppercase px-10 py-4 rounded-2xl border text-sm cursor-not-allowed select-none"
            style={{
              borderColor: `color-mix(in srgb, var(--color-lisek-brown) 30%, transparent)`,
              background: `color-mix(in srgb, var(--color-lisek-brown) 8%, transparent)`,
              color: `color-mix(in srgb, var(--color-lisek-brown) 60%, transparent)`,
            }}
          >
            Download CV — coming soon
          </button>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            title="AI-readable Markdown version of this site"
            className="font-anton tracking-widest uppercase px-10 py-4 rounded-2xl border text-sm transition-all duration-300 hover:scale-[1.03]"
            style={{
              borderColor: `color-mix(in srgb, var(--color-lisek-orange) 40%, transparent)`,
              background: `color-mix(in srgb, var(--color-lisek-orange) 8%, transparent)`,
              color: `var(--color-lisek-orange)`,
            }}
          >
            View as .md ↗
          </a>
        </div>
      </div>

      <Projects />
    </section>
  )
}
