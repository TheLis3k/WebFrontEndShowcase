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
├── Loader              – animated loading screen (spinner + progress bar)
├── ParticlesCanvas     – background particle field (HTML5 Canvas)
└── HeroSection/
    ├── index.tsx       – orchestrator; owns scroll state, refs to DOM targets
    ├── HeroContent     – title "TheLis3k", subtitle "aka. Ksawery", FoxLogo
    ├── CometLayer      – canvas + positioned div for comet head/trail
    ├── LampGlow        – glowing "landing" element shown at end of flight
    └── ScrollHint      – scroll indicator
```

`AboutMe` lives below HeroSection and is revealed after the comet animation completes.

### Comet flight system

The signature interaction: user scroll/swipe triggers a comet that flies through specific DOM elements and lands on the lamp glow.

- **`useFlightInput`** – translates wheel / touch events into a normalised `progress` value (0 → 1), also handles reverse (scroll up = rewind).
- **`useCometFlight`** – consumes progress, drives a `requestAnimationFrame` loop, renders orange trail on `<canvas>`, applies `.comet-strike` class when the comet hits the "3" digit (~progress 0.25), triggers `.fly-away` on hero content at ~80%, and scrolls to AboutMe at completion.
- **`flightPath.ts`** – builds a 1 500-point Bezier path that visits: start → "3" digit → "aka." text → fox logo → lamp position. Coordinates are read from DOM `getBoundingClientRect` (lazy, on a 1 600 ms delay after mount).

Animation state is stored in refs rather than React state to avoid re-renders inside the rAF loop.

## Styling

**Tailwind CSS 4.3** via Vite plugin. All custom design tokens are defined as CSS variables in [src/index.css](src/index.css) and must be used instead of hardcoded values.

### Design tokens

| Variable | Value | Usage |
|---|---|---|
| `--color-lisek-dark` | `#1F1F1F` | Primary background |
| `--color-lisek-brown` | `#5C4742` | Secondary/muted surfaces |
| `--color-lisek-light` | `#E5EBEA` | Body text |
| `--color-lisek-orange` | `#FFA737` | Primary accent |
| `--color-lisek-orange-dark` | `#DC851F` | Hover/pressed accent |
| `--font-righteous` | `'Righteous'` | Display headings |
| `--font-anton` | `'Anton'` | Uppercase subtitles |

### Key utility classes (custom, defined in index.css)

- `.fly-away` – translates element up and fades out (applied by hook at flight ~80%)
- `.glow-text` – orange text-shadow
- `.comet-strike` – bright white glow burst when comet hits a target
- `fadeInUp`, `lantern-pulse` – named keyframe animations

## Code conventions

- Follow **SOLID** principles when editing or creating files.
- Always use the global CSS variables above — never hardcode colours or font names.
- Canvas drawing (comet trail) must stay inside `useCometFlight`; do not mix canvas logic into components.
- Keep coordinate math in `flightPath.ts`; hooks call it, components do not.
- Particle count: 30 on mobile (`window.innerWidth < 768`), 60 on desktop — keep responsive.
