import { useRef } from 'react'
import { useParticles } from '../hooks/useParticles'

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticles(canvasRef)
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none opacity-40" />
}
