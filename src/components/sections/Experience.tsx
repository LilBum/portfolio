import { CheckCircle2 } from 'lucide-react'
import { experience } from '../../data/experience'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-surface/35 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Production work that holds up"
          description="Roles with measurable users, migration scope, testing, and delivery impact - references available on request."
        />

        <div className="relative">
          <span
            aria-hidden
            className="absolute bottom-6 left-[7.5px] top-3 w-px bg-gradient-to-b from-accent-2/60 via-border to-transparent"
          />

          <div className="grid gap-8">
            {experience.map((job, i) => (
              <Reveal
                key={`${job.company}-${job.role}`}
                delay={i * 0.08}
                className="relative pl-10 sm:pl-14"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-7 flex h-4 w-4 items-center justify-center rounded-full border border-accent-2/50 bg-bg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                </span>

                <article className="rounded-2xl border border-border bg-bg/55 p-6 transition-colors hover:border-accent-2/40 sm:p-7">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-eyebrow text-accent-2">
                        {job.company}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{job.location}</p>
                    </div>
                    <p className="shrink-0 self-start rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-muted">
                      {job.dates}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
