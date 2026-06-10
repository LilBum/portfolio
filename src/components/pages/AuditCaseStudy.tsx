import { useEffect } from 'react'
import { ArrowLeft, CheckCircle2, Mail, ShieldAlert } from 'lucide-react'
import { site } from '../../data/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

const stats = [
  { value: '296', label: 'scripts reviewed' },
  { value: '54', label: 'dead legacy scripts flagged' },
  { value: '10', label: 'critical fixes shipped live' },
  { value: '$5k-$10k', label: 'fully phased fix scope' },
]

const criticalFindings = [
  {
    title: 'The game sold things it never delivered',
    body: 'A paid currency-multiplier pass silently granted nothing due to a one-line API misuse. Two entire shop tabs could not complete a purchase at all. A finished cosmetics wardrobe was fully built but never reachable by players. Lost revenue and refund/report risk, independent of any "bug."',
  },
  {
    title: 'A server script leaked a live webhook token',
    body: 'A hardcoded third-party webhook (token included) fired on every player join - meaning the token was effectively public. The fix is one deletion, but the token also had to be revoked at the source, which became a written owner action item.',
  },
  {
    title: 'A remote cloned anything the client asked for',
    body: 'One RemoteEvent accepted a client-supplied Instance and cloned it to the player - free arbitrary items for any exploiter. Rewritten to a server-side name allowlist and verified live to reject Instance and table payloads.',
  },
  {
    title: 'A repeatable currency farm and god-mode remotes',
    body: 'A social-reward handler granted premium currency on every fire with no claim flag, and two unauthenticated remotes allowed arbitrary stat writes. All were closed with one-time claim flags, cooldowns, and deletion of the unvalidated paths.',
  },
]

const methodPoints = [
  'Read-only first: the audit pass changed nothing, so the owner could share it safely with any developer for quotes',
  'Every finding tagged with severity and human-dev effort, then bundled into priced phases - from a "stop the bleeding" pass costing a few hundred dollars up to the full scope',
  'Each issue tied to its exact script and line, so any developer could action the document without re-discovery',
  'Key findings independently re-checked - and two early findings were downgraded on re-review and said so in writing, so nothing in the report overstates risk',
]

const fixHighlights = [
  'All ten critical security, economy, and paid-delivery findings fixed in a first implementation pass',
  'Paid cosmetics and progression features wired end-to-end so owners actually receive what they bought',
  'Fixes verified in live playtests: clean joins, one-time reward claims, exploit payloads rejected, no shop crashes',
  'Owner handoff with the remaining phases, decision points, and security action items in writing',
]

export default function AuditCaseStudy() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Roblox Live-Game Audit - Case Study | Alexander Urs-Badet'
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
            A horror-genre Roblox experience with an active player base and real revenue needed to
            know why things kept breaking - and what it would cost to fix. The client and game are
            kept anonymous here; the numbers, method, and outcomes are real.
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
              The game had a solid, modern core - a server-authoritative round loop and a
              ProfileStore-backed data and shop layer - sitting on top of a large, half-wired legacy
              layer inherited from an off-the-shelf template kit. Roughly 54 of its 296 scripts were
              disabled, and most player-facing bugs lived at the seam between the two systems.
            </p>
            <p>
              The brief: review everything read-only, produce a findings document the owner could act
              on with any developer, and price the work in phases. After the owner reviewed the
              findings, a follow-up engagement shipped the critical fixes directly in the live place.
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
            Beyond the critical group: a settings menu that was ~80% non-functional shell, finished
            features sitting disabled, dead persistence paths, soft-locks in the core loop, and a
            long tail of cleanup - each one written up with severity, effort, and price.
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
            I do read-only audits first, so you get a document you can act on with anyone - not a
            sales pitch for my own hours.
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
