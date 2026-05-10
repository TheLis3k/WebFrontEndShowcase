import { useCallback, useEffect, useRef } from 'react'
import { buildSmoothPath, getSmoothPos, type Coords, type Point } from '../utils/flightPath'
import { useFlightInput } from './useFlightInput'

export interface FlightRefs {
  threeRef: React.RefObject<HTMLSpanElement | null>
  hRef: React.RefObject<HTMLSpanElement | null>
  foxRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  scrollHintRef: React.RefObject<HTMLDivElement | null>
  lampGlowRef: React.RefObject<HTMLDivElement | null>
  trailCanvasRef: React.RefObject<HTMLCanvasElement | null>
  cometHeadRef: React.RefObject<HTMLDivElement | null>
}

// First 85%: ease-in-out (organic setup through elements + spiral)
// Last 15%: linear (maintains momentum through dive + pull)
function easeFlightProgress(t: number): number {
  if (t < 0.85) {
    const sub = t / 0.85
    const eased = sub < 0.5 ? 2 * sub * sub : 1 - Math.pow(-2 * sub + 2, 2) / 2
    return 0.85 * eased
  }
  return t
}

export function useCometFlight(): FlightRefs {
  const threeRef = useRef<HTMLSpanElement>(null)
  const hRef = useRef<HTMLSpanElement>(null)
  const foxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const lampGlowRef = useRef<HTMLDivElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
  const cometHeadRef = useRef<HTMLDivElement>(null)

  const isFlying = useRef(false)
  const hasFlown = useRef(false)
  const flightProgress = useRef(0)
  const AboutMeTriggered = useRef(false)
  const lastPos = useRef<Point | null>(null)
  const coords = useRef<Coords | null>(null)
  const smoothPath = useRef<Point[]>([])
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const triggerFlight = useCallback(() => {
    if (isFlying.current || hasFlown.current) return
    isFlying.current = true
    if (scrollHintRef.current) scrollHintRef.current.style.opacity = '0'
  }, [])

  useFlightInput({
    canTrigger: () => !isFlying.current && !hasFlown.current,
    onTrigger: triggerFlight,
  })

  useEffect(() => {
    if (!threeRef.current || !hRef.current || !foxRef.current || !contentRef.current ||
        !lampGlowRef.current || !trailCanvasRef.current || !cometHeadRef.current) return

    const threeEl = threeRef.current!
    const hEl = hRef.current!
    const foxEl = foxRef.current!
    const heroContent = contentRef.current!
    const lampGlow = lampGlowRef.current!
    const trailCanvas = trailCanvasRef.current!
    const head = cometHeadRef.current!

    ctxRef.current = trailCanvas.getContext('2d')
    const trailCtx = ctxRef.current!

    function resizeTrail() {
      trailCanvas!.width = window.innerWidth
      trailCanvas!.height = window.innerHeight
    }
    window.addEventListener('resize', resizeTrail)
    resizeTrail()

    function updateCoords() {
      const getCenter = (el: HTMLElement) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top, bottom: r.bottom }
      }
      const t = getCenter(threeEl!)
      const h = getCenter(hEl!)
      const f = getCenter(foxEl!)
      coords.current = {
        startX: window.innerWidth / 2, startY: -50,
        threeX: t.x, threeY: t.y, threeBottom: t.bottom,
        hX: h.x,
        foxX: f.x, foxTop: f.top, foxBottom: f.bottom,
        endX: window.innerWidth / 2, endY: 70,
      }
      smoothPath.current = buildSmoothPath(coords.current)
    }

    const coordsTimer = setTimeout(updateCoords, 1600)
    window.addEventListener('resize', updateCoords)

    function drawTrailSegment(from: Point, to: Point) {
      trailCtx.beginPath()
      trailCtx.moveTo(from.x, from.y)
      trailCtx.lineTo(to.x, to.y)
      trailCtx.strokeStyle = '#FFA737'
      trailCtx.lineWidth = 10
      trailCtx.lineCap = 'round'
      trailCtx.shadowBlur = 20
      trailCtx.shadowColor = '#DC851F'
      trailCtx.stroke()
    }

    let rafId: number

    function render() {
      if (isFlying.current && coords.current) {
        flightProgress.current += 0.010

        const rawP = flightProgress.current
        const displayP = easeFlightProgress(Math.min(rawP, 1))

        if (rawP >= 1) {
          isFlying.current = false
          hasFlown.current = true
          lampGlow.style.opacity = ''
          lampGlow.classList.add('lantern-active')
          // Set transform inline first to prevent one-frame un-centered flash
          head.style.translate = 'none'
          head.style.transform = 'translate(-50%, -50%)'
          head.style.left = `${coords.current.endX}px`
          head.style.top = `${coords.current.endY}px`
          head.style.background = '#FFD580'
          head.style.boxShadow = ''
          head.classList.add('comet-rest')
          trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height)
        }

        if (isFlying.current && smoothPath.current.length) {
          trailCtx.globalCompositeOperation = 'destination-out'
          trailCtx.fillStyle = 'rgba(0,0,0,0.25)'
          trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height)
          trailCtx.globalCompositeOperation = 'source-over'

          const pos = getSmoothPos(smoothPath.current, displayP)
          if (!lastPos.current) lastPos.current = pos

          head.style.opacity = '1'
          head.style.left = `${pos.x}px`
          head.style.top = `${pos.y}px`

          if (displayP > 0.01 && displayP < 0.90) drawTrailSegment(lastPos.current, pos)

          if (displayP > 0.05 && displayP < 0.32) {
            const dist = Math.hypot(pos.x - coords.current!.threeX, pos.y - coords.current!.threeY)
            threeEl.classList.toggle('comet-strike', dist < 100)
          } else {
            threeEl.classList.remove('comet-strike')
          }

          if (displayP > 0.85) {
            lampGlow.style.opacity = String(((displayP - 0.85) / 0.15) * 0.5)
          }

          if (displayP > 0.65) heroContent.classList.add('fly-away')

          if (displayP > 0.85 && !AboutMeTriggered.current) {
            AboutMeTriggered.current = true
            document.getElementById('next-section')?.classList.add('landed')
          }

          lastPos.current = pos
        }
      }

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      clearTimeout(coordsTimer)
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resizeTrail)
      window.removeEventListener('resize', updateCoords)
    }
  }, [])

  return { threeRef, hRef, foxRef, contentRef, scrollHintRef, lampGlowRef, trailCanvasRef, cometHeadRef }
}
