import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'
import './case-study.css'

export default function AuditCaseStudy() {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Reviewing a live Roblox game | ${site.name}`
    heading.current?.focus({ preventScroll: true })
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="audit-page">
      <nav className="audit-nav" aria-label="Portfolio">
        <a href="#top">{site.name}</a>
        <a href="#projects"><ArrowLeft size={15} aria-hidden /> Back to projects</a>
      </nav>
      <main className="audit-main">
        <header className="audit-intro">
          <p className="audit-label">Game systems · Client work</p>
          <h1 ref={heading} tabIndex={-1}>Reviewing a live Roblox game</h1>
          <p className="audit-lead">
            A Roblox developer hired me to review a game people were already playing.
            The owner needed to know which issues could affect players and what to fix first.
          </p>
        </header>

        <section className="audit-section" aria-labelledby="audit-review">
          <h2 id="audit-review">The review</h2>
          <div>
            <p>
              I started with the shop, rewards, and saved progress. I traced what was
              supposed to happen when a player made a purchase or earned an item, then
              checked what happened in the game.
            </p>
            <p>
              I wrote up each finding with the evidence, its effect on players, and
              the work involved in fixing it. Two of my early findings turned out
              to be less serious when I checked them again. I lowered their priority
              in the report.
            </p>
          </div>
        </section>

        <section className="audit-section" aria-labelledby="audit-fixes">
          <h2 id="audit-fixes">Fixes and handoff</h2>
          <div>
            <p>
              I came back for the urgent fixes. That included getting paid items
              and progression rewards to the players who earned them. I checked
              purchases, joins, and one-time rewards again after the changes.
            </p>
            <p>
              The owner kept the report and a phased list of the remaining work to
              share with the other developers.
            </p>
          </div>
        </section>
        <footer className="audit-footer">
          <a href="#projects"><ArrowLeft size={15} aria-hidden /> All projects</a>
          <a href={`mailto:${site.email}`}>Email Alex <ArrowUpRight size={15} aria-hidden /></a>
        </footer>
      </main>
    </div>
  )
}
