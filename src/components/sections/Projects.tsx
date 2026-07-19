import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ProjectCard from '../ui/ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Projects that left receipts"
          description="Production engineering first, then the independent and research systems where I go deeper - an options bot built around a hard risk engine, real-time computer vision and robotics, and lower-level reverse-engineering and security work."
        />

        {featured.map((project) => (
          <Reveal key={project.title} className="mb-6 min-w-0">
            <ProjectCard project={project} />
          </Reveal>
        ))}

        <div className="grid gap-6 lg:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.06} className="h-full min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
