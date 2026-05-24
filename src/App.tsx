import ParticlesCanvas from './components/ParticlesCanvas'
import HeroSection from './components/HeroSection'
import AboutMe from './components/AboutMe'

export default function App() {
  return (
    <div className="antialiased relative bg-lisek-dark">
      <ParticlesCanvas />
      <HeroSection />
      <AboutMe />
    </div>
  )
}
