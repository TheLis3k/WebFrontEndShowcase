import type { RefObject } from 'react'

interface Props {
  nodeRef: RefObject<HTMLDivElement | null>
}

export default function LampGlow({ nodeRef }: Props) {
  return (
    <div
      ref={nodeRef}
      style={{ left: '50%', top: '100px', transform: 'translate(-50%, -50%)' }}
      className="fixed w-150 md:w-200 h-150 md:h-200 bg-lisek-orange rounded-full mix-blend-screen opacity-0 pointer-events-none transition-opacity duration-1000 z-30 blur-[150px]"
    />
  )
}
