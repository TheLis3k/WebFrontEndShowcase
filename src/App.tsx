import { useState } from 'react'
import Loader from './components/Loader'
import ParticlesCanvas from './components/ParticlesCanvas'
import HeroSection from './components/HeroSection'
import AboutMe from './components/AboutMe'
import CVPage from './components/CVPage'

export default function App() {
  const [showCV, setShowCV] = useState(false)

  return (
    <div className="antialiased relative bg-lisek-dark">
      <Loader />
      <ParticlesCanvas />
      <HeroSection />
      <AboutMe onOpenCV={() => setShowCV(true)} />
      {showCV && <CVPage onClose={() => setShowCV(false)} />}
    </div>
  )
}
