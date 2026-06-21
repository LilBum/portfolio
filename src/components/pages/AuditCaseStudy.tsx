import { useEffect } from 'react'
import { ArrowLeft, CheckCircle2, Mail, ShieldAlert } from 'lucide-react'
import { site } from '../../data/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

const stats = [
  { value: '296', label: 'scripts read' },
  { value: '54', label: 'disabled scripts' },
  { value: '10', label: 'urgent fixes' },
  { value: '$5k-$10k', label: 'cleanup range' },
]

const criticalFindings = [
  {
    title: 'Players could pay and get nothing',
    body: 'One paid currency pass called the wrong API, so it never paid out. Two shop tabs died mid-purchase. Cosmetics were in the code, but players had no path to them.',
  },
  {
    title: 'A webhook token was sitting in server code',
    body: 'A join script had a full webhook URL in it. I removed the call from Roblox code; the token still had to be revoked where it was created.',
  },
  {
    title: 'One remote would clone whatever the client sent',
    body: 'A RemoteEvent took an Instance from the client and cloned it. Grants moved to a server allowlist, then I tried the ugly payloads again.',
  },
  {
    title: 'Currency and stat remotes were too trusting',
    body: 'The social reward paid premium currency every time it fired. Two stat remotes trusted callers they should not. Some paths got cooldowns and claim flags; the worst ones got deleted.',
  },
]

const methodPoints = [
  'Read first, edit later. The owner needed something they could show other devs.',
  'Severity, effort, and rough price went next to each issue.',
  'Every claim had a script name and line reference beside it.',
  'Two scary early findings got downgraded after I re-tested them.',
]

const fixHighlights = [
  'Ten security, economy, and purchase bugs went first.',
  'Paid cosmetics and progression rewards now point at the things players bought.',
  'Live checks covered joins, one-time rewards, bad payloads, and shop flows.',
  'The owner kept the rest of the phase list, plus the security chores outside Roblox.',
]

export default function AuditCaseStudy() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Roblox Live-Game Audit - Case Study | Alex Urs-Badet'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </a>
          <a href="#top" className="font-display text-sm font-bold tracking-tight">
            {site.shortName}
            <span className="text-accent">.</span>
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-eyebrow text-accent-3">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-accent-3/70" />
            Case study - Roblox consulting
          </p>
          <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Auditing a live, monetized Roblox game
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Live Roblox horror game. Real players, real purchases, and enough old code that bugs had
            started stacking on top of each other. The game stays anonymous here; the counts do not.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-surface/60 p-5">
              <div className="font-display text-2xl font-bold tracking-tight text-accent-3 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">The engagement</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              The new code was not the villain by itself. There was server round logic, ProfileStore
              data, a newer shop, and older template-kit scripts living beside it. Fifty-four scripts
              were disabled. The risky bugs lived in the overlap.
            </p>
            <p>
              Round one was read-only. Report first, price the cleanup in phases, then come back for
              the urgent purchase and security fixes.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            What the audit found
          </h2>
          <div className="mt-6 grid gap-4">
            {criticalFindings.map((finding) => (
              <article
                key={finding.title}
                className="rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent-3/40"
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-accent-3" />
                  <div>
                    <h3 className="font-semibold text-fg">{finding.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{finding.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            The small notes were still worth writing down: a mostly empty settings menu, finished
            features left disabled, dead save paths, core-loop soft-locks, and too much cleanup to
            price by guessing.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">The method</h2>
          <ul className="mt-6 grid gap-3">
            {methodPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-2 sm:mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            The fix pass
          </h2>
          <ul className="mt-6 grid gap-3">
            {fixHighlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-surface/70 p-8 text-center sm:p-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent-3/60 to-transparent"
          />
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Have a live game that needs this treatment?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
            I can start read-only and leave you with the report. No live edits unless you ask for the
            fix pass.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${site.email}`}>
              <Mail size={16} /> Email me
            </Button>
            <Button href="#projects" variant="ghost">
              <ArrowLeft size={16} /> Back to projects
            </Button>
          </div>
        </Reveal>
      </main>
    </div>
  )
}
