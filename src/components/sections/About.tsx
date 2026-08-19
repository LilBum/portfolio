import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const strengths = [
  {
    title: 'Production delivery',
    copy: 'Angular, AWS, and Node systems in a regulated environment, with careful releases, high test coverage, and real users depending on the workflows.',
  },
  {
    title: 'Research systems',
    copy: 'Computer-vision tracking, pose estimation, and closed-loop robot control built for neuroscience and robotics workflows in lab settings.',
  },
  {
    title: 'Systems that hold up',
    copy: 'Authentication, third-party integrations, risk engines, and security audits where correctness, reliability, and abuse cases matter.',
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="A production engineer with research-systems depth"
          description="Full-stack delivery in regulated environments, with additional depth in deployed client software, computer vision, robotics, automation, and secure systems."
        />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              At TSPi I write Angular and AWS software for USDA Farm Service
              Agency loan programs. The work is financial calculators, legacy
              migrations, production forms, and federally regulated workflows
              where a small broken flow can become someone else&apos;s
              afternoon.
            </p>

            <p>
              That constraint is what I like about it. Regulated software has
              to be right the first time, so I spend most of my energy on the
              parts that decide whether a release holds: validation rules,
              role-dependent states, test coverage, and controlled rollout.
            </p>

            <p>
              Outside work I build systems that answer to messy real-world
              inputs, because that is the same problem in a different costume.
              Cameras lose targets. Robots need stable control. Brokers
              disconnect mid-trade. Third-party APIs return junk. I&apos;ve
              shipped a live site for an operating care business, a real-time
              tracking pipeline driving a mobile robot, and a trading system
              designed to refuse to trade when it cannot prove it is safe.
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
                  <h3 className="text-sm font-semibold text-fg">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
