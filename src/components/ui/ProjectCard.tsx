import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import type { Project } from '../../data/projects'
import ProjectArt from './ProjectArt'

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={`project-entry ${featured ? 'project-feature' : 'project-row'}`}
    >
      <ProjectArt project={project} />
      <div className="project-heading">
        <p className="project-byline">{project.category} <span aria-hidden>/</span> {project.year}</p>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
      </div>
      <div className="project-body">
        <p className="project-blurb">{project.blurb}</p>
        <p className="project-tools">{project.tags.join(' · ')}</p>
        <div className="project-actions">
          {project.caseStudy && <a href={project.caseStudy}>Read case study <ArrowRight aria-hidden size={15} /></a>}
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.hrefLabel ?? 'Visit project'} <ArrowUpRight aria-hidden size={15} />
            </a>
          )}
          {project.details && (
            <details className="project-details">
              <summary>Project notes <Plus aria-hidden size={14} /></summary>
              <div className="project-notes">
                {project.details.map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            </details>
          )}
        </div>
      </div>
    </article>
  )
}
