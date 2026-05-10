import { useEffect } from 'react'
import type { RefObject } from 'react'

const COLORS = ['#FFA737', '#DC851F', '#5C4742', '#E5EBEA']

export function useParticles(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const count = window.innerWidth < 768 ? 30 : 60
    const particles = Array.from({ length: count }, () => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      size:   Math.random() * 2.5,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2,
      color:  COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let rafId: number
    function animate() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x > canvas!.width)  p.x = 0
        if (p.x < 0)              p.x = canvas!.width
        if (p.y > canvas!.height) p.y = 0
        if (p.y < 0)              p.y = canvas!.height
        ctx.fillStyle   = p.color
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])
}
