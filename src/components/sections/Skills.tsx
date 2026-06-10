import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { skillGroups } from '../../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-surface/35 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolbox"
          title="Practical skills across app and game work"
          description="The stack I use most often for production web software, Roblox systems, and audit-driven fixes."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.06}
              className="rounded-2xl border border-border bg-bg/55 p-5 transition-colors hover:border-accent-2/40"
            >
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-eyebrow text-accent-2">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-transparent bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent-2/30 hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
