import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ProjectCard from '../ui/ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects with real systems behind them"
          description="Production full-stack delivery, real-time computer vision and robotics, an algorithmic trading engine, and security-focused audit work."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.06} className="h-full min-w-0">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
