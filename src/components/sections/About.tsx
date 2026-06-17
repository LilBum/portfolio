import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const strengths = [
  {
    title: 'Full-stack delivery',
    copy: 'Angular/AWS systems in a regulated environment: test coverage, careful migrations, uptime thinking, and clear release risk.',
  },
  {
    title: 'Real-time systems',
    copy: 'Computer-vision tracking and closed-loop robot control - fast and reliable enough to run live in a research lab.',
  },
  {
    title: 'Systems depth',
    copy: 'Trading risk engines, anti-exploit game economies, security audits - I like the part where it has to actually hold up.',
  },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="A full-stack engineer who goes deep on systems"
          description="Production web at work; computer vision, robotics, algorithmic trading, and game systems on my own time."
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a full-stack software engineer. At TSPi I build Angular and AWS systems for
              federally regulated loan workflows used daily by 1,500+ people, and I carried a decade-old
              Java application through a Spring migration with 10,000+ tests intact.
            </p>
            <p>
              Outside of work I go deep on systems that interest me: a real-time computer-vision tracker
              (OpenCV + Kalman filtering) that steers a robot in a research lab, an automated
              options-trading engine with its own risk controls and backtester, and server-authoritative
              Roblox game systems. I&apos;m comfortable across the stack and genuinely enjoy the AI/ML and
              systems end of the work.
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
