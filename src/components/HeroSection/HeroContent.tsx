import type { RefObject } from 'react'
import FoxLogo from '../FoxLogo'

interface Props {
  threeRef: RefObject<HTMLSpanElement | null>
  hRef: RefObject<HTMLSpanElement | null>
  foxRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
}

export default function HeroContent({ threeRef, hRef, foxRef, contentRef }: Props) {
  return (
    <div
      ref={contentRef}
      className="flex flex-col items-center w-full relative pointer-events-auto will-change-transform"
      style={{ transition: 'all 2000ms cubic-bezier(0.25, 1, 0.5, 1)' }}
    >
      <h1 className="font-righteous text-6xl sm:text-8xl md:text-9xl text-lisek-light tracking-wide fade-in-up delay-100 select-none">
        T<span ref={hRef} className="inline-block">h</span>eLis<span ref={threeRef} className="text-lisek-orange glow-text inline-block cursor-default">3</span>k
      </h1>
      <p className="font-anton text-xl sm:text-2xl md:text-3xl text-lisek-brown tracking-[0.2em] uppercase mt-2 fade-in-up delay-300 select-none relative z-10">
        aka. Ksawery
      </p>
      <div ref={foxRef} className="mt-12 fade-in-up delay-500 relative z-10">
        <FoxLogo />
      </div>
    </div>
  )
}
