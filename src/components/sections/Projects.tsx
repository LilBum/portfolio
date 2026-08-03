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
          description="Selected engineering work across regulated production software, private full-stack systems, a live client deployment, computer vision, risk engineering, and security consulting."
        />

        {featured.map((project) => (
          <Reveal key={project.title} className="mb-6 min-w-0">
            <ProjectCard project={project} />
          </Reveal>
        ))}

        <div className="grid gap-6 lg:grid-cols-2">
          {rest.map((project, i) => {
            const lastProject = i === rest.length - 1
            return (
              <Reveal
                key={project.title}
                delay={i * 0.06}
                className={lastProject ? 'h-full min-w-0 lg:col-span-2' : 'h-full min-w-0'}
              >
                <ProjectCard project={project} wide={lastProject} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
