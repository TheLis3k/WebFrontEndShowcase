import { useEffect } from 'react'

interface FlightInputOptions {
  canTrigger: () => boolean
  onTrigger: () => void
}

export function useFlightInput({ canTrigger, onTrigger }: FlightInputOptions) {
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (e.deltaY > 0 && canTrigger() && window.scrollY < 50) onTrigger()
    }

    function onTouchStart(e: TouchEvent) {
      const startY = e.touches[0].clientY
      const onTouchEnd = (e2: TouchEvent) => {
        const delta = startY - e2.changedTouches[0].clientY
        if (delta > 30 && canTrigger()) onTrigger()
        window.removeEventListener('touchend', onTouchEnd)
      }
      window.addEventListener('touchend', onTouchEnd)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])
}
