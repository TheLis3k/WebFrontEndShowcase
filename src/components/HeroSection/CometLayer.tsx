import type { RefObject } from 'react'

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>
  headRef: RefObject<HTMLDivElement | null>
}

export default function CometLayer({ canvasRef, headRef }: Props) {
  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-99" style={{ willChange: 'transform' }} />
      <div
        ref={headRef}
        className="fixed rounded-full pointer-events-none z-100 opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 12, height: 12,
          background: '#FFF',
          boxShadow: '0 0 30px 15px rgba(255,167,55,0.8), 0 0 60px 30px rgba(220,133,31,0.4)',
          transition: 'background 1.2s ease, box-shadow 1.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
