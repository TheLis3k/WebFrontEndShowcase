export type Point = { x: number; y: number }

export type Coords = {
  startX: number; startY: number
  threeX: number; threeY: number; threeBottom: number
  hX: number
  foxX: number; foxTop: number; foxBottom: number
  endX: number; endY: number
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function buildSmoothPath(c: Coords): Point[] {
  const steps = 1500
  const foxR = window.innerWidth < 768 ? 60 : 80
  const raw: Point[] = []

  const foxCenterY = (c.foxTop + c.foxBottom) / 2
  const underH = c.threeBottom + 30

  for (let i = 0; i <= steps; i++) {
    const p = i / steps
    let x: number, y: number

    if (p < 0.20) {
      // start → "3" center
      const tp = p / 0.20
      x = lerp(c.startX, c.threeX, tp)
      y = lerp(c.startY, c.threeY, tp)
    } else if (p < 0.30) {
      // "3" center → below "3" bottom
      const tp = (p - 0.20) / 0.10
      x = c.threeX
      y = lerp(c.threeY, c.threeBottom + 40, tp)
    } else if (p < 0.50) {
      // below "3" → under "h" (sweep left)
      const tp = (p - 0.30) / 0.20
      x = lerp(c.threeX, c.hX, tp)
      y = lerp(c.threeBottom + 40, underH, tp)
    } else if (p < 0.68) {
      // under "h" → fox top (entry point for clockwise spiral, arriving rightward)
      const tp = (p - 0.50) / 0.18
      x = lerp(c.hX, c.foxX, tp)
      y = lerp(underH, foxCenterY - foxR, tp)
    } else if (p < 0.85) {
      // clockwise spiral from fox top, radius shrinks, center drifts to endX but stays at fox Y
      const tp = (p - 0.68) / 0.17
      const radius = lerp(foxR, 0, tp)
      const angle = -Math.PI / 2 + tp * Math.PI * 2
      const cx = lerp(c.foxX, c.endX, tp)
      x = cx + Math.cos(angle) * radius
      y = foxCenterY + Math.sin(angle) * radius
    } else if (p < 0.93) {
      // dive toward AboutMe boundary — comet descends to "grab" the rising section
      const tp = (p - 0.85) / 0.08
      x = c.endX
      y = lerp(foxCenterY, window.innerHeight * 0.82, tp)
    } else {
      // pull — rocket up to final position, dragging the section with it
      const tp = (p - 0.93) / 0.07
      x = c.endX
      y = lerp(window.innerHeight * 0.82, c.endY, tp)
    }
    raw.push({ x, y })
  }

  const W = 40
  return raw.map((_, i) => {
    let sx = 0, sy = 0, count = 0
    for (let j = -W; j <= W; j++) {
      const idx = Math.max(0, Math.min(steps, i + j))
      sx += raw[idx].x; sy += raw[idx].y; count++
    }
    return { x: sx / count, y: sy / count }
  })
}

export function getSmoothPos(path: Point[], p: number): Point {
  const max = path.length - 1
  const idx = p * max
  const i = Math.min(Math.floor(idx), max - 1)
  const frac = idx - i
  return {
    x: path[i].x + (path[i + 1].x - path[i].x) * frac,
    y: path[i].y + (path[i + 1].y - path[i].y) * frac,
  }
}
