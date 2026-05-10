import type { RefObject } from 'react'

interface Props {
  nodeRef: RefObject<HTMLDivElement | null>
}

export default function ScrollHint({ nodeRef }: Props) {
  return (
    <div
      ref={nodeRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40 fade-in-up delay-500 transition-opacity duration-500"
    >
      <span className="text-lisek-brown text-xs tracking-widest uppercase mb-2 font-anton">SCROLL DOWN</span>
      <div className="w-[2px] h-8 bg-lisek-orange rounded-full" />
    </div>
  )
}
