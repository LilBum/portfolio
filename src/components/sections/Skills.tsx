import { languages, projectLanguages, researchSkills, skillGroups } from '../../data/skills'
import './background.css'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="folio-background skills-background">
      <div className="folio-width">
        <div className="skills-layout">
          <h2 id="skills-title" className="background-heading">Technical skills</h2>
          <div>
            <dl className="skills-languages">
              <dt>Programming languages</dt>
              <dd>{languages.join(', ')}</dd>
              <dt>Also used in projects</dt>
              <dd className="skills-project-languages">{projectLanguages.join(' · ')}</dd>
            </dl>
            <dl className="skills-research">
              {researchSkills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.description}{group.note && <p>{group.note}</p>}</dd>
                </div>
              ))}
            </dl>
            <dl className="tools-list">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
