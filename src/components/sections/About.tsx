import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const strengths = [
  {
    title: 'Production discipline',
    copy: 'I bring test coverage, migration care, uptime thinking, and clear release risk to the work.',
  },
  {
    title: 'Roblox systems depth',
    copy: 'I focus on server-owned gameplay, safe remotes, data durability, economy controls, and UI feedback.',
  },
  {
    title: 'Audit-to-fix clarity',
    copy: 'I can turn a messy live place into prioritized findings, phased estimates, and concrete code tasks.',
  },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="A software engineer with a game-systems edge"
          description="Enterprise web work gives me the production baseline. Roblox work keeps me close to gameplay, player feedback, and fast iteration."
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I work across professional full-stack software and Roblox development. At TSPi, I build
              Angular and AWS-backed systems for federally regulated loan workflows. In Roblox projects,
              I build the parts that decide whether an experience survives real players: data loading,
              monetization guards, server validation, UI state, progression loops, and performance-aware
              world iteration.
            </p>
            <p>
              The overlap is the important part. I like systems that are pleasant on the surface and
              boring in production: clear contracts, guarded edge cases, useful telemetry, and enough
              polish that users understand what just happened.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {strengths.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{item.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
