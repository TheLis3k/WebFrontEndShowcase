import { useEffect } from "react"
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, ShadingType,
} from "docx"

function buildPrintHTML(): string {
  const orange = "#b45309"
  const muted  = "#6b7280"
  const dark   = "#111827"

  const badge = (text: string, accent = false) =>
    `<span style="display:inline-block;font-size:9px;padding:2px 7px;border-radius:12px;border:1px solid ${accent ? "#fcd34d" : "#d1d5db"};color:${accent ? "#92400e" : "#374151"};background:${accent ? "#fffbeb" : "#f9fafb"};margin:2px 2px 0 0">${text}</span>`

  const expHTML = experience.map(exp => `
    <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #e5e7eb">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
        <div>
          <div style="font-weight:600;font-size:11.5px;color:${dark}">${exp.role}</div>
          <div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${orange}">${exp.company}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;margin-left:12px">
          <div style="font-size:10px;color:${muted}">${exp.period}</div>
          <div style="font-size:9px;color:#9ca3af">${exp.duration}</div>
        </div>
      </div>
      <ul style="margin:5px 0 6px 0;padding-left:0;list-style:none">
        ${exp.bullets.map(b => `<li style="font-size:10px;color:#374151;padding-left:12px;position:relative;margin-bottom:2px"><span style="position:absolute;left:0;color:${orange}">›</span>${b}</li>`).join("")}
      </ul>
      <div>${exp.skills.map(s => badge(s, true)).join("")}</div>
    </div>`).join("")

  const projHTML = projects.map(p => `
    <div style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e5e7eb">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px">
        <span style="font-size:11px;font-weight:700;color:${orange}">${p.name}</span>
        <span style="font-size:9px;color:${muted};flex-shrink:0;margin-left:8px">${p.period}</span>
      </div>
      <div style="font-size:10px;color:#374151;margin-bottom:2px">${p.desc}</div>
      <div style="font-size:9px;color:${muted}">${p.tech} · ${p.url}</div>
    </div>`).join("")

  const heading = (label: string) =>
    `<div style="font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${orange};border-bottom:1px solid #e5e7eb;padding-bottom:4px;margin-bottom:8px;margin-top:16px">${label}</div>`

  const techBadges  = techSkills.map(s => badge(s, true)).join("")
  const softBadges  = softSkills.map(s => badge(s)).join("")

  const eduHTML = education.map(ed => `
    <div style="margin-bottom:10px">
      <div style="font-size:10.5px;font-weight:600;color:${orange}">${ed.degree}</div>
      <div style="font-size:10px;color:${dark}">${ed.school}</div>
      <div style="font-size:9px;color:${muted}">${ed.location} · ${ed.period}</div>
      ${ed.extra ? `<div style="font-size:9px;color:#9ca3af;margin-top:1px">${ed.extra}</div>` : ""}
    </div>`).join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ksawery Chabowski — CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Righteous&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 1.4cm 1.6cm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    /* bar is hidden in print (default), only shown on screen via @media screen */
    .bar { display: none; }
    @media screen {
      .bar {
        display: flex;
        position: fixed;
        top: 0; left: 0; right: 0;
        background: #1f1f1f;
        color: #ffa737;
        font-family: sans-serif;
        font-size: 13px;
        padding: 10px 20px;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
      }
      body { padding-top: 46px; }
    }
    body { font-family: 'Righteous', Georgia, serif; font-size: 11px; color: ${dark}; background: white; line-height: 1.45; }
    h1 { font-family: 'Righteous', serif; font-size: 28px; font-weight: 700; color: ${dark}; }
  </style>
</head>
<body>
  <div class="bar">
    <span>CV Preview — click to save as PDF</span>
    <button onclick="window.print()" style="background:#ffa737;color:#1f1f1f;border:none;padding:6px 16px;border-radius:6px;font-weight:700;cursor:pointer;font-size:13px">Print / Save PDF</button>
  </div>

  <h1><span style="color:${orange}">Ksawery</span> Chabowski</h1>
  <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${muted};margin:4px 0 8px">Full-Stack Developer · Automation Engineer</div>
  <div style="font-size:10px;color:${muted};display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">
    <span style="color:${orange}">thelis3k.pl</span>
    <span>·</span><span>github.com/TheLis3k</span>
    <span>·</span><span>linkedin.com/in/kc05</span>
    <span>·</span><span>${email}</span>
  </div>

  <div style="display:flex;gap:24px;align-items:flex-start">
    <div style="flex:2;min-width:0">
      ${heading("Experience")}
      ${expHTML}
      ${heading("Selected Projects")}
      ${projHTML}
    </div>
    <div style="flex:1;min-width:0">
      ${heading("Tech Skills")}
      <div style="margin-bottom:4px">${techBadges}</div>
      ${heading("Soft Skills")}
      <div style="margin-bottom:4px">${softBadges}</div>
      ${heading("Education")}
      ${eduHTML}
      ${heading("Languages")}
      <div style="font-size:10px;margin-bottom:4px">
        ${[["Polish","C2 — Native"],["English","C1 — Fluent"],["German","B1 — Basic"]].map(([l,v]) => `<div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="color:${dark}">${l}</span><span style="color:${muted}">${v}</span></div>`).join("")}
      </div>
      ${heading("Outside Work")}
      <div style="font-size:10px;color:#374151;line-height:1.5">After hours he builds his own projects — currently running CreativeShape and developing more side-projects. Member of the PJATK{AI} science club; shares knowledge about AI tooling, Agentic Repos, and LLMs. Regularly organises informal workshops for university friends. Reads psychology, self-improvement, and productivity. To reset: gym, pool, kayaking.</div>
      ${heading("Other")}
      <div style="font-size:10px;color:${dark}">Driver's licence — cat. B<br>Cert: technik-informatyk-351203</div>
    </div>
  </div>
</body>
</html>`
}

type Props = { onClose: () => void }

const email = "ksawery2k19@gmail.com"

const experience = [
  {
    role: "Technical Implementation Specialist",
    company: "Talentech",
    period: "2025 – present",
    duration: "7+ months",
    skills: ["Playwright", "Cypress", "Python", "React", "Angular", "Java", "Spring Boot", "C#", ".NET", "Bash", "Azure DevOps", "CI/CD"],
    bullets: [
      "Automated the entire manual client-onboarding process — eliminated a category of work, not just sped it up",
      "AI penetration testing in production; found issues and shipped fixes",
      "Built cross-system integrations; migrated Angular views to React",
      "Led internal Agentic AI workshop: Skills, Rules, Sub-Agents, Multi-Repo",
      "Migrated E2E suite from Cypress to Playwright using AI agents to drive the migration itself",
      "Built an Agentic Repo that generates automation scripts automatically — meta-automation",
      "Sprint planning, daily standups, client relationship management",
    ],
  },
  {
    role: "Mobile Field Service Technician",
    company: "Exorigo-Upos",
    period: "2025",
    duration: "3 months",
    skills: ["Linux", "Bash", "Hardware Repair", "Process Optimisation"],
    bullets: [
      "Remote and on-site hardware/software troubleshooting for enterprise clients",
      "Authored missing configuration guides; optimised service-depot inventory processes",
      "Trained colleagues on client-specific procedures; hit positive KPI targets consistently",
    ],
  },
  {
    role: "Product Manager",
    company: "AmRest (KFC)",
    period: "2024 – 2025",
    duration: "6 months",
    skills: ["Team Leadership", "KPI", "BHP / FSCC", "Procurement", "Mentoring"],
    bullets: [
      "Ran shifts end-to-end: product & team management (up to 12 people)",
      "Data-driven procurement to minimise waste and maximise margins",
      "Maintained BHP and FSCC audit compliance; mentored and onboarded new staff",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "thyssenkrupp",
    period: "2021",
    duration: "2 months",
    skills: ["PHP", "SQL", "PowerBI", "Excel"],
    bullets: [
      "Turned large datasets into clean, decision-ready dashboards and reports",
      "Wrote SQL queries; transformed tables to present company performance results",
    ],
  },
  {
    role: "IT Technician & Sales Intern",
    company: "MaxCon",
    period: "2023",
    duration: "2 months",
    skills: ["Hardware Repair", "IoT Configuration", "Customer Service"],
    bullets: [
      "Hardware consulting, IoT device repair and configuration",
      "Shipment management and order fulfilment",
    ],
  },
]

const education = [
  {
    degree: "Engineer's degree (in progress)",
    school: "PJATK — Polish-Japanese Academy of IT",
    location: "Gdańsk, weekend mode",
    period: "2024 – present",
    extra: "Student council · PJATK{AI} science club · runs internal AI-tooling workshops",
  },
  {
    degree: "IT Technician Diploma",
    school: "Zespół Szkół Energetycznych",
    location: "Gdańsk",
    period: "2019 – 2024",
    extra: "Cert: technik-informatyk-351203",
  },
]

const projects = [
  {
    name: "CreativeShape",
    period: "2026 – now",
    tech: "React, Svelte, Drizzle, Tailwind, Vercel",
    desc: "NFC-keychain start-up co-founded with a friend. Owns the entire online side — landing, SEO, per-card meta tags, and a full card-management CMS.",
    url: "creativeshape.pl",
  },
  {
    name: "Evenciki.pl",
    period: "2026",
    tech: "SvelteKit 5, NestJS, Drizzle ORM, PostgreSQL, Bun",
    desc: "Event-planning platform built with uni friends in one month. Mobile-first, bilingual PL/EN. MVP scoped and shipped fast.",
    url: "evenciki.pl",
  },
  {
    name: "Restaurant Admin",
    period: "2026",
    tech: "React, TypeScript, Spring Boot, PostgreSQL, Docker",
    desc: "Full-stack restaurant system: public site + role-based admin panel with JWT auth, rotating refresh tokens, invitation-based onboarding.",
    url: "github.com/TheLis3k/WizytowkaSandbox",
  },
  {
    name: "RyboKalkulator",
    period: "2025",
    tech: "Flutter, Dart, NoSQL, C++",
    desc: "Mobile fish-pricing app for a friend's fish counter. Trilingual species names, designed for a low-end device — light and fast through a busy season.",
    url: "github.com/TheLis3k/RyboKalkulator",
  },
  {
    name: "How Much Is My Hot Wheels",
    period: "2024",
    tech: "Java 21, Spring Boot, MongoDB, JSoup, Playwright, Docker",
    desc: "REST API scraping eBay, Etsy, OLX, Vinted and Hot Wheels Wiki in parallel to aggregate live die-cast valuations.",
    url: "github.com/TheLis3k/how-much-is-my-hot-wheels",
  },
]

const techSkills = [
  "JavaScript", "TypeScript", "Java", "Dart", "C#",
  "React", "Angular", "Spring Boot", "NestJS", "SvelteKit", "Flutter",
  "PostgreSQL", "MongoDB", "Drizzle ORM", "Docker",
  "Linux", "Bash", "Playwright", "Cypress", "Python", "CI/CD", "Azure DevOps",
  "AI Agents / Skills / Rules",
]

const softSkills = [
  "Fast Learner", "Clear Communicator", "Analytical Thinker",
  "Teamwork", "Kaizen", "Tech-to-Business Translation",
]

const glassCard = {
  background: `color-mix(in srgb, var(--color-lisek-brown) 10%, transparent)`,
  borderColor: `color-mix(in srgb, var(--color-lisek-brown) 25%, transparent)`,
}

const orangeBadge = {
  background: `color-mix(in srgb, var(--color-lisek-orange) 10%, transparent)`,
  color: `var(--color-lisek-orange)`,
  border: `1px solid color-mix(in srgb, var(--color-lisek-orange) 28%, transparent)`,
}

const brownBadge = {
  background: `color-mix(in srgb, var(--color-lisek-brown) 15%, transparent)`,
  color: `var(--color-lisek-light)`,
  border: `1px solid color-mix(in srgb, var(--color-lisek-brown) 35%, transparent)`,
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2
      className="font-anton tracking-widest uppercase text-xs mb-3 pb-1.5 border-b"
      style={{
        color: `var(--color-lisek-brown)`,
        borderColor: `color-mix(in srgb, var(--color-lisek-brown) 28%, transparent)`,
      }}
    >
      {children}
    </h2>
  )
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    text: text.toUpperCase(),
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "5C4742", space: 4 } },
    shading: { type: ShadingType.CLEAR, fill: "FFFFFF" },
  })
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, size: 20, font: "Calibri", color: "1F1F1F" })],
    spacing: { before: 40, after: 40 },
    indent: { left: 240 },
  })
}

function labelValue(label: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, font: "Calibri", color: "1F1F1F" }),
      new TextRun({ text: value, size: 20, font: "Calibri", color: "1F1F1F" }),
    ],
    spacing: { before: 40, after: 40 },
  })
}

async function buildDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 20, color: "1F1F1F" } },
      },
      paragraphStyles: [
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          run: { bold: true, size: 22, color: "5C4742", font: "Calibri" },
        },
      ],
    },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } } },
      children: [
        // Name & title
        new Paragraph({
          children: [new TextRun({ text: "Ksawery Chabowski", bold: true, size: 52, font: "Calibri", color: "1F1F1F" })],
          alignment: AlignmentType.LEFT,
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Full-Stack Developer · Automation Engineer", size: 24, font: "Calibri", color: "5C4742" })],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `${email}  ·  thelis3k.pl  ·  github.com/TheLis3k  ·  linkedin.com/in/kc05`, size: 18, font: "Calibri", color: "5C4742" })],
          spacing: { after: 200 },
        }),

        // Experience
        sectionHeading("Experience"),
        ...experience.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({ text: exp.role, bold: true, size: 22, font: "Calibri", color: "1F1F1F" }),
              new TextRun({ text: `  —  ${exp.company}`, size: 22, font: "Calibri", color: "5C4742" }),
              new TextRun({ text: `  |  ${exp.period}  (${exp.duration})`, size: 18, font: "Calibri", color: "888888" }),
            ],
            spacing: { before: 160, after: 60 },
          }),
          ...exp.bullets.map(b => bullet(b)),
          new Paragraph({
            children: [new TextRun({ text: exp.skills.join("  ·  "), size: 18, font: "Calibri", color: "888888", italics: true })],
            spacing: { before: 60, after: 100 },
          }),
        ]),

        // Projects
        sectionHeading("Selected Projects"),
        ...projects.flatMap(p => [
          new Paragraph({
            children: [
              new TextRun({ text: p.name, bold: true, size: 22, font: "Calibri", color: "1F1F1F" }),
              new TextRun({ text: `  |  ${p.period}`, size: 18, font: "Calibri", color: "888888" }),
            ],
            spacing: { before: 160, after: 40 },
          }),
          new Paragraph({
            children: [new TextRun({ text: p.desc, size: 20, font: "Calibri", color: "1F1F1F" })],
            spacing: { after: 40 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `${p.tech}  ·  ${p.url}`, size: 18, font: "Calibri", color: "888888", italics: true })],
            spacing: { after: 100 },
          }),
        ]),

        // Skills
        sectionHeading("Tech Skills"),
        new Paragraph({
          children: [new TextRun({ text: techSkills.join("  ·  "), size: 20, font: "Calibri", color: "1F1F1F" })],
          spacing: { after: 100 },
        }),
        sectionHeading("Soft Skills"),
        new Paragraph({
          children: [new TextRun({ text: softSkills.join("  ·  "), size: 20, font: "Calibri", color: "1F1F1F" })],
          spacing: { after: 100 },
        }),

        // Education
        sectionHeading("Education"),
        ...education.flatMap(ed => [
          new Paragraph({
            children: [new TextRun({ text: ed.degree, bold: true, size: 22, font: "Calibri", color: "1F1F1F" })],
            spacing: { before: 120, after: 40 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `${ed.school}  ·  ${ed.location}  ·  ${ed.period}`, size: 20, font: "Calibri", color: "5C4742" })],
            spacing: { after: 40 },
          }),
          ...(ed.extra ? [new Paragraph({
            children: [new TextRun({ text: ed.extra, size: 18, font: "Calibri", color: "888888", italics: true })],
            spacing: { after: 80 },
          })] : []),
        ]),

        // Languages
        sectionHeading("Languages"),
        labelValue("Polish",  "C2 — Native"),
        labelValue("English", "C1 — Fluent"),
        labelValue("German",  "B1 — Basic"),

        // Outside Work
        sectionHeading("Outside Work"),
        new Paragraph({
          children: [new TextRun({ text: "After hours he builds his own projects — currently running CreativeShape and developing more side-projects. Member of the PJATK{AI} science club; shares knowledge about AI tooling, Agentic Repos, and LLMs. Regularly organises informal workshops for university friends. Reads psychology, self-improvement, and productivity. To reset: gym, pool, kayaking.", size: 20, font: "Calibri", color: "1F1F1F" })],
          spacing: { after: 100 },
        }),

        // Other
        sectionHeading("Other"),
        labelValue("Driver's licence", "cat. B"),
        labelValue("Certification", "technik-informatyk-351203"),
      ],
    }],
  })

  return doc
}

async function handleDocx() {
  const doc = await buildDocx()
  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "Ksawery_Chabowski_CV.docx"
  a.click()
  URL.revokeObjectURL(url)
}

function handlePrint() {
  const win = window.open("", "_blank")
  if (!win) { alert("Allow pop-ups to download the CV"); return }
  win.document.write(buildPrintHTML())
  win.document.close()
}

export default function CVPage({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      id="cv-overlay"
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: `color-mix(in srgb, var(--color-lisek-dark) 98%, transparent)` }}
    >
      {/* Controls — hidden when printing */}
      <div
        className="cv-controls sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b"
        style={{
          background: `color-mix(in srgb, var(--color-lisek-dark) 92%, transparent)`,
          borderColor: `color-mix(in srgb, var(--color-lisek-brown) 28%, transparent)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={onClose}
          className="font-anton tracking-widest uppercase text-sm px-4 py-2 rounded-xl border transition-all hover:scale-105"
          style={{
            borderColor: `color-mix(in srgb, var(--color-lisek-brown) 40%, transparent)`,
            color: `var(--color-lisek-brown)`,
          }}
        >
          ← Back
        </button>
        <span className="font-righteous text-sm" style={{ color: `var(--color-lisek-orange)` }}>
          Ksawery Chabowski — CV
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleDocx}
            className="font-anton tracking-widest uppercase text-sm px-5 py-2 rounded-xl border transition-all hover:scale-[1.03]"
            style={{
              borderColor: `color-mix(in srgb, var(--color-lisek-brown) 50%, transparent)`,
              background: `color-mix(in srgb, var(--color-lisek-brown) 10%, transparent)`,
              color: `var(--color-lisek-light)`,
            }}
          >
            ATS .docx ↓
          </button>
          <button
            onClick={handlePrint}
            className="font-anton tracking-widest uppercase text-sm px-5 py-2 rounded-xl border transition-all hover:scale-[1.03]"
            style={{
              borderColor: `color-mix(in srgb, var(--color-lisek-orange) 50%, transparent)`,
              background: `color-mix(in srgb, var(--color-lisek-orange) 10%, transparent)`,
              color: `var(--color-lisek-orange)`,
            }}
          >
            Download PDF ↓
          </button>
        </div>
      </div>

      {/* CV body */}
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
        <header className="mb-8">
          <h1 className="font-righteous text-5xl mb-1" style={{ color: `var(--color-lisek-light)` }}>
            Ksawery{" "}
            <span style={{ color: `var(--color-lisek-orange)` }}>Chabowski</span>
          </h1>
          <p
            className="font-anton tracking-widest uppercase text-lg mb-3"
            style={{ color: `var(--color-lisek-brown)` }}
          >
            Full-Stack Developer · Automation Engineer
          </p>
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-righteous"
            style={{ color: `var(--color-lisek-light)` }}
          >
            <span style={{ color: `var(--color-lisek-orange)` }}>thelis3k.pl</span>
            <span style={{ color: `var(--color-lisek-brown)` }}>·</span>
            <span>github.com/TheLis3k</span>
            <span style={{ color: `var(--color-lisek-brown)` }}>·</span>
            <span>linkedin.com/in/kc05</span>
            <span style={{ color: `var(--color-lisek-brown)` }}>·</span>
            <span>{email}</span>
          </div>
        </header>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Main column: Experience + Projects */}
          <div className="md:col-span-2 space-y-8">

            {/* Experience */}
            <section>
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-5">
                {experience.map(exp => (
                  <div
                    key={exp.role}
                    className="rounded-2xl border p-5"
                    style={glassCard}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3
                          className="font-righteous text-base leading-tight"
                          style={{ color: `var(--color-lisek-light)` }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="font-anton tracking-wider uppercase text-sm"
                          style={{ color: `var(--color-lisek-orange)` }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-righteous text-sm" style={{ color: `var(--color-lisek-brown)` }}>
                          {exp.period}
                        </p>
                        <p className="font-righteous text-xs" style={{ color: `color-mix(in srgb, var(--color-lisek-brown) 65%, transparent)` }}>
                          {exp.duration}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {exp.bullets.map(b => (
                        <li key={b} className="flex gap-2 text-sm font-righteous" style={{ color: `var(--color-lisek-light)` }}>
                          <span className="shrink-0 mt-0.5" style={{ color: `var(--color-lisek-orange)` }}>›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full font-righteous" style={orangeBadge}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <SectionHeading>Selected Projects</SectionHeading>
              <div className="space-y-3">
                {projects.map(p => (
                  <div
                    key={p.name}
                    className="rounded-2xl border p-4"
                    style={glassCard}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h3 className="font-righteous text-sm font-bold" style={{ color: `var(--color-lisek-orange)` }}>
                        {p.name}
                      </h3>
                      <span className="font-righteous text-xs shrink-0" style={{ color: `var(--color-lisek-brown)` }}>
                        {p.period}
                      </span>
                    </div>
                    <p className="font-righteous text-sm mb-1" style={{ color: `var(--color-lisek-light)` }}>
                      {p.desc}
                    </p>
                    <p className="font-righteous text-xs" style={{ color: `var(--color-lisek-brown)` }}>
                      {p.tech} · {p.url}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Side column */}
          <div className="space-y-6">

            {/* Tech Skills */}
            <section>
              <SectionHeading>Tech Skills</SectionHeading>
              <div className="flex flex-wrap gap-1.5">
                {techSkills.map(s => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full font-righteous" style={orangeBadge}>
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Soft Skills */}
            <section>
              <SectionHeading>Soft Skills</SectionHeading>
              <div className="flex flex-wrap gap-1.5">
                {softSkills.map(s => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full font-righteous" style={brownBadge}>
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-4">
                {education.map(ed => (
                  <div key={ed.school}>
                    <p className="font-righteous text-sm" style={{ color: `var(--color-lisek-orange)` }}>
                      {ed.degree}
                    </p>
                    <p className="font-righteous text-sm" style={{ color: `var(--color-lisek-light)` }}>
                      {ed.school}
                    </p>
                    <p className="font-righteous text-xs" style={{ color: `var(--color-lisek-brown)` }}>
                      {ed.location} · {ed.period}
                    </p>
                    {ed.extra && (
                      <p className="font-righteous text-xs mt-0.5" style={{ color: `color-mix(in srgb, var(--color-lisek-brown) 70%, transparent)` }}>
                        {ed.extra}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <SectionHeading>Languages</SectionHeading>
              <div className="space-y-2">
                {[
                  { lang: "Polish",  level: "C2 — Native" },
                  { lang: "English", level: "C1 — Fluent" },
                  { lang: "German",  level: "B1 — Basic" },
                ].map(({ lang, level }) => (
                  <div key={lang} className="flex items-center justify-between text-sm">
                    <span className="font-righteous" style={{ color: `var(--color-lisek-light)` }}>{lang}</span>
                    <span className="font-righteous" style={{ color: `var(--color-lisek-brown)` }}>{level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Outside Work */}
            <section>
              <SectionHeading>Outside Work</SectionHeading>
              <p className="font-righteous text-sm leading-relaxed" style={{ color: `var(--color-lisek-light)` }}>
                After hours he builds his own projects — currently running CreativeShape and developing more side-projects. Member of the PJATK{"{AI}"} science club; shares knowledge about AI tooling, Agentic Repos, and LLMs. Regularly organises informal workshops for university friends. Reads psychology, self-improvement, and productivity. To reset: gym, pool, kayaking.
              </p>
            </section>

            {/* Other */}
            <section>
              <SectionHeading>Other</SectionHeading>
              <ul className="space-y-1 font-righteous text-sm" style={{ color: `var(--color-lisek-light)` }}>
                <li>Driver's licence — cat. B</li>
                <li>Cert: technik-informatyk-351203</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
