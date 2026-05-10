export default function AboutMe() {
  return (
    <section
      id="next-section"
      className="w-full h-full flex flex-col items-center pt-32"
      style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,167,55,0.15) 0%, #1F1F1F 70%)`,
        maskImage: `linear-gradient(to bottom, transparent 0%, black 10%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 10%)`,
      }}
    >
      <div className="text-center z-10 w-full max-w-4xl px-6">
        <h2 className="font-righteous text-4xl md:text-6xl text-lisek-light mb-4">Hello there!</h2>
        <p className="font-anton text-xl text-lisek-brown tracking-widest uppercase mb-16">
          ABOUT ME
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-lisek-brown/10 border border-lisek-brown/20 rounded-2xl" />
          <div className="h-64 bg-lisek-brown/10 border border-lisek-brown/20 rounded-2xl" />
        </div>
      </div>
    </section>
  )
}
