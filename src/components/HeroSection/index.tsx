import { useCometFlight } from '../../hooks/useCometFlight'
import LampGlow from './LampGlow'
import HeroContent from './HeroContent'
import ScrollHint from './ScrollHint'
import CometLayer from './CometLayer'

export default function HeroSection() {
  const { threeRef, hRef, foxRef, contentRef, scrollHintRef, lampGlowRef, trailCanvasRef, cometHeadRef } = useCometFlight()

  return (
    <>
      <LampGlow nodeRef={lampGlowRef} />

      <main className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none">
        <HeroContent threeRef={threeRef} hRef={hRef} foxRef={foxRef} contentRef={contentRef} />
        <ScrollHint nodeRef={scrollHintRef} />
      </main>

      <CometLayer canvasRef={trailCanvasRef} headRef={cometHeadRef} />
    </>
  )
}
