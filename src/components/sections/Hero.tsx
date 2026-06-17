import { motion } from 'framer-motion'
import { ArrowDown, FileText, Mail, Sparkles } from 'lucide-react'
import { site } from '../../data/site'
import Button from '../ui/Button'
import CodeWindow from '../ui/CodeWindow'
import { LinkedInIcon } from '../ui/Icons'

const iconLink =
  'inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface/60 text-muted backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-fg'

const heroSnippet = `# size by risk budget, then cap by premium and hard limits
risk_per_contract = option_mid * 100 * premium_stop_pct
contracts = floor(account_equity * risk_pct / risk_per_contract)
contracts = min(contracts, max_by_premium, max_contracts)

if contracts <= 0:
    return reject("risk_budget_too_small")
if realized_pnl <= -max_daily_loss:
    return reject("daily_loss_lockout")
if open_positions >= max_open:
    return reject("max_open_positions")

submit_bracket(order, contracts)`

export default function Hero() {
  return (
    <section className="hero-section relative flex items-center overflow-hidden px-6 py-16 pt-28 sm:py-24 sm:pt-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_30rem_at_78%_18%,color-mix(in_srgb,var(--color-accent)_13%,transparent),transparent_65%),radial-gradient(40rem_26rem_at_8%_82%,color-mix(in_srgb,var(--color-accent-2)_9%,transparent),transparent_62%)]"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,var(--color-bg)_0%,rgba(252,248,244,0)_100%)]" />

      <div className="hero-content mx-auto min-w-0 sm:w-full sm:max-w-6xl lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-bg/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            Available for full-stack engineering roles
          </p>

          <h1 className="max-w-4xl text-balance font-display text-5xl font-bold leading-[1.04] tracking-tight text-fg sm:text-7xl lg:text-6xl xl:text-7xl">
            {site.name}
            <span className="mt-3 block max-w-[18rem] bg-gradient-to-r from-accent-2 via-accent to-accent-3 bg-clip-text text-[1.55rem] leading-tight text-transparent sm:max-w-none sm:text-4xl lg:text-3xl xl:text-4xl">
              {site.role}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:text-lg">
            {site.tagline}
          </p>

          <div className="hero-ctas mt-9 grid grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center">
            <Button href="#projects" className="col-span-2 sm:col-span-1">
              View work <ArrowDown size={16} />
            </Button>
            <Button href={site.resumeUrl} variant="ghost" external>
              <FileText size={16} /> Resume
            </Button>
            <Button href={`mailto:${site.email}`} variant="ghost">
              <Mail size={16} /> Email
            </Button>
            <div className="flex items-center gap-3">
              <span className="hidden h-7 w-px bg-border sm:block" />
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
                <LinkedInIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden className="relative hidden min-w-0 lg:block">
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent)]" />

          <CodeWindow
            file="risk.py"
            code={heroSnippet}
            lang="py"
            className="relative rotate-[1.2deg] shadow-[0_32px_80px_-30px_rgba(63,42,96,0.28)]"
          />

          <motion.div
            animate={{ y: [-7, 7] }}
            transition={{ duration: 4.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute -right-5 top-10 inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-bold text-bg shadow-[0_16px_36px_-12px_rgba(124,58,237,0.42)]"
          >
            <Sparkles size={15} /> Order ready
          </motion.div>

          <motion.div
            animate={{ y: [6, -6] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.6 }}
            className="absolute -left-7 bottom-9 w-44 rounded-2xl border border-border bg-surface/90 p-3.5 shadow-[0_18px_40px_-16px_rgba(63,42,96,0.20)] backdrop-blur"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Risk budget <span className="text-accent-2">60%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg/80">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-accent-2 to-accent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
