import { projects } from "./data"
import { ProjectCard } from "./ProjectCard"

export default function Projects() {
  return (
    <section className="w-full max-w-4xl px-6 pb-24 pt-16">
      <div className="text-center mb-10">
        <h2 className="font-righteous text-4xl md:text-6xl text-lisek-light mb-4">TheLis3k's Projects</h2>
        <p className="font-anton text-xl text-lisek-brown tracking-widest uppercase">PROJECTS</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(p => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}
