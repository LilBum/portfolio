import ProjectCard from '../ui/ProjectCard'
import { projects } from '../../data/projects'
import './project-list.css'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="project-index">
      <div className="folio-width">
        <h2 id="projects-heading">Selected work<span aria-hidden>.</span></h2>
        <div className="project-features">
          {projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} featured />)}
        </div>
        <div className="project-catalog">
          {projects.slice(2).map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}
