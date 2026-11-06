import { experience } from '../../data/experience'
import { ArrowUpRight } from 'lucide-react'
import './background.css'

function monthIndex(month: string) {
  const [year, monthOfYear] = month.split('-').map(Number)
  return year * 12 + monthOfYear - 1
}

function CareerTimeline() {
  const now = new Date()
  const currentMonth = now.getFullYear() * 12 + now.getMonth()
  const periods = experience.flatMap((job) => job.periods)
  const firstYear = Math.floor(Math.min(...periods.map((period) => monthIndex(period.start))) / 12)
  const lastMonth = Math.max(...periods.map((period) => period.end ? monthIndex(period.end) : currentMonth))
  const years = Array.from({ length: Math.floor(lastMonth / 12) - firstYear + 1 }, (_, i) => firstYear + i)
  const monthsInView = years.length * 12

  return (
    <nav className="career-map" aria-label="Jump to an experience by employer">
      <div className="career-axis" aria-hidden="true">
        {years.map((year) => <span key={year}>{year}</span>)}
      </div>
      <div className="career-rows">
        {experience.map((job) => (
          <a key={job.id} className="career-link" href={'#role-' + job.id}
            aria-label={job.company + ', ' + job.dates}>
            <span className="career-name">{job.shortCompany ?? job.company}</span>
            <span className="career-track" aria-hidden="true" style={{ backgroundSize: (100 / years.length) + '% 100%' }}>
              {job.periods.map((period) => {
                const start = monthIndex(period.start)
                const end = period.end ? monthIndex(period.end) : Math.max(start, currentMonth)
                return (
                  <span key={period.start} className={'career-segment' + (period.end ? '' : ' career-ongoing')}
                    style={{
                      left: ((start - firstYear * 12) / monthsInView * 100) + '%',
                      width: ((end - start + 1) / monthsInView * 100) + '%',
                    }}
                  />
                )
              })}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="folio-background exp-background">
      <div className="folio-width">
        <div className="experience-intro">
          <h2 id="experience-title" className="background-heading">Experience</h2>
          <CareerTimeline />
        </div>
        <div className="history-list">
          {experience.map((job) => (
            <article key={job.id} id={'role-' + job.id} className="history-entry" tabIndex={-1}>
              <header className="history-heading">
                <p className="history-date">{job.dates}</p>
                <h3>{job.company}</h3>
                <p className="history-role">{job.role}</p>
                <p className="history-place">{job.location}</p>
              </header>
              <div className="history-body">
                {job.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
                {job.demo && (
                  <a className="history-demo" href={job.demo.href}>
                    {job.demo.label} <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                )}
                {job.impact && (
                  <dl className="history-impact">
                    {job.impact.map((stat) => (
                      <div key={stat.label}>
                        <dt>{stat.value}</dt>
                        <dd>{stat.label}<small>{stat.detail}</small></dd>
                      </div>
                    ))}
                  </dl>
                )}
                {job.footnote && <p className="history-footnote">{job.footnote}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
