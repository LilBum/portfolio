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
    copy: 'Risk engines, anti-exploit game systems, security audits, and backend architecture where correctness, reliability, and abuse cases matter.',
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      {' '}
      <div className="mx-auto max-w-6xl">
        {' '}
        <SectionHeading
          eyebrow="About"
          title="A production engineer with research-systems depth"
          description="Full-stack delivery in regulated environments, with additional depth in computer vision, robotics, automation, and secure game systems."
        />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a full-stack software engineer who builds systems that
              need to work for real users, not just demos. At TSPi, I develop
              Angular and AWS software for Farm Service Agency loan workflows
              used by roughly 1,500 loan officers and applicants.
            </p>

            <p>
              Most of my professional work sits at the intersection of frontend
              complexity, backend reliability, careful testing, and release
              risk. I&apos;ve worked on financial calculators, legacy
              migrations, production forms, and federally regulated workflows
              where a small broken flow can become someone else&apos;s
              afternoon.
            </p>

            <p>
              I also build research and independent systems where the code has
              to answer to messy real-world inputs: cameras losing targets,
              robots needing stable control, trading systems requiring strict
              risk limits, and Roblox clients sending untrusted data. That is
              the kind of engineering I enjoy most, systems that have to hold up
              when conditions are imperfect.
            </p>

            <p>
              Recently, that has included neuroscience and robotics software:
              behavioral tracking, pose-estimation pipelines, and robot-control
              tooling used in lab settings. I&apos;m especially interested in
              software that connects production engineering, AI-adjacent tools,
              and real-time systems.
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
