# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc) then bundle for production
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

## Architecture

**React 19 + TypeScript + Vite** portfolio/business-card site for "TheLis3k" (aka. Ksawery). English-language, dark-themed, animation-heavy.

### Component tree

```
App
├── Loader              – animated loading screen (spinner + progress bar, 1600 ms)
├── ParticlesCanvas     – background particle field (HTML5 Canvas, z-index -2)
├── HeroSection/
│   ├── index.tsx       – orchestrator; calls useCometFlight, wires refs to sub-components
│   ├── HeroContent     – title "TheLis3k" (threeRef on "3", hRef on "h"), subtitle "aka. Ksawery", FoxLogo (foxRef)
│   ├── CometLayer      – trail <canvas> (trailCanvasRef) + comet head <div> (cometHeadRef)
│   ├── LampGlow        – large blurred orange circle, fades in at flight ~85% (lampGlowRef)
│   └── ScrollHint      – "SCROLL DOWN" bounce indicator (scrollHintRef), hidden when flight starts
└── AboutMe             – revealed when comet lands; id="next-section", slides in via .landed class
```

### Comet flight system

The signature interaction: scroll/swipe triggers a comet that flies through DOM elements and lands on the lamp glow. All animation state lives in refs (not React state) to avoid re-renders inside the rAF loop.

- **`useFlightInput`** – wheel (downward scroll when `scrollY < 50`) and touch (upward swipe delta > 30 px) both call `onTrigger`. Once triggered, `canTrigger()` stays false.
- **`useCometFlight`** – owns all refs; drives a `requestAnimationFrame` loop; returns `FlightRefs` for HeroSection to spread onto components. Progress increments by `0.010` per frame (eased via `easeFlightProgress`).
- **`flightPath.ts`** – builds a 1 500-point smoothed path (Catmull-Rom-like, window W=40); coordinates are read from `getBoundingClientRect` after a 1 600 ms delay post-mount.

#### Flight path phases (raw progress 0 → 1)

| Range | Segment |
|---|---|
| 0.00 – 0.20 | Start (top-center, y=-50) → "3" center |
| 0.20 – 0.30 | "3" center → below "3" bottom (+40 px) |
| 0.30 – 0.50 | Below "3" → under "h" (sweep left) |
| 0.50 – 0.68 | Under "h" → fox top (clockwise spiral entry) |
| 0.68 – 0.85 | Clockwise spiral around fox, radius shrinks 80→0 px |
| 0.85 – 0.93 | Dive down to 82 % viewport height |
| 0.93 – 1.00 | Pull up to final lamp position (endY = 70) |

#### Key flight triggers

| Threshold (displayP) | Effect |
|---|---|
| > 0.05 & < 0.32, dist < 100 px | `.comet-strike` on "3" |
| > 0.65 | `.fly-away` on hero content |
| > 0.85 | `lampGlow.style.opacity` fades in; `#next-section` gets `.landed` |
| = 1.00 | Trail cleared; comet head becomes resting golden dot with `.comet-rest` |

## Styling

**Tailwind CSS 4.3** via Vite plugin. All custom design tokens are CSS variables in [src/index.css](src/index.css) — never hardcode colours or font names.

### Design tokens

| Variable | Value | Usage |
|---|---|---|
| `--color-lisek-dark` | `#1F1F1F` | Primary background |
| `--color-lisek-brown` | `#5C4742` | Secondary/muted surfaces |
| `--color-lisek-light` | `#E5EBEA` | Body text |
| `--color-lisek-orange` | `#FFA737` | Primary accent |
| `--color-lisek-orange-dark` | `#DC851F` | Hover/pressed accent |
| `--font-righteous` | `'Righteous', cursive` | Display headings |
| `--font-anton` | `'Anton', sans-serif` | Uppercase subtitles |

### Key utility classes (custom, defined in index.css)

| Class | Behaviour |
|---|---|
| `.fly-away` | `translateY(-120vh) scale(0.9)`, opacity 0 — applied by hook at flight ~65 % |
| `.glow-text` | Orange `text-shadow` with cubic-bezier transition |
| `.comet-strike` | Bright white/orange glow burst + scale(1.2) on "3" |
| `.fade-in-up` | `fadeInUp` keyframe (1.5 s); delay helpers `.delay-100/300/500` |
| `.lantern-active` | `lantern-pulse` keyframe (4 s infinite alternate) |
| `.comet-rest` | `comet-rest` keyframe (3 s infinite alternate) — floating golden dot |
| `#next-section.landed` | `translateY(0)` — slides AboutMe in from below |

`#next-section` starts at `translateY(100vh)` (fixed, z-index 20) and transitions with `cubic-bezier(0.2, 0, 0.1, 1)` over 0.45 s when `.landed` is added.

## AboutMe section

- Two glass-morphic cards side by side (soft skills / tech skills) above social links grid
- Glass style built with `color-mix(in srgb, var(--color-lisek-brown) …, transparent)` + `backdrop-filter: blur(12px)` — defined as the `glassCard` inline style object in [src/components/AboutMe.tsx](src/components/AboutMe.tsx)
- Email link uses lazy `getMailto()` (parts joined at click time) to avoid plain-text address in HTML
- CV button is `disabled` (coming soon)
- Has its own `useParticles` canvas for the particle background

## Code conventions

- Follow **SOLID** principles when editing or creating files.
- Always use the global CSS variables — never hardcode colours or font names.
- Canvas drawing (comet trail) must stay inside `useCometFlight`; do not mix canvas logic into components.
- Keep coordinate math in `flightPath.ts`; hooks call it, components do not.
- Particle count: 30 on mobile (`window.innerWidth < 768`), 60 on desktop — keep responsive.
- Animation state goes in refs, not React state, to avoid re-renders inside the rAF loop.
