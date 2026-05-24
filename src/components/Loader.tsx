import { useEffect, useRef } from 'react'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progress = progressRef.current
    const loader = loaderRef.current
    if (!progress || !loader) return

    const t1 = setTimeout(() => { progress.style.width = '100%' }, 50)
    let t3: ReturnType<typeof setTimeout>
    const t2 = setTimeout(() => {
      loader.style.opacity = '0'
      t3 = setTimeout(() => { loader.style.display = 'none' }, 300)
    }, 600)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div ref={loaderRef} id="loader" className="fixed inset-0 z-[10001] bg-lisek-dark flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-lisek-brown rounded-full" />
        <div className="absolute inset-0 border-4 border-lisek-orange rounded-full border-t-transparent animate-spin" />
      </div>
      <div className="mt-8 text-lisek-orange font-righteous tracking-widest text-xl animate-pulse">LOADING...</div>
      <div className="w-48 h-1 bg-lisek-brown mt-4 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-lisek-orange w-0 transition-all duration-500 ease-out" />
      </div>
    </div>
  )
}
