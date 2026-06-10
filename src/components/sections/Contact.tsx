import { useState } from 'react'
import { Check, Mail, MapPin } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { DiscordIcon, LinkedInIcon } from '../ui/Icons'
import { site } from '../../data/site'

/** Discord usernames aren't linkable, so this shows the handle and copies it on click. */
function DiscordButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.socials.discord)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable (e.g. insecure context) - the handle is visible in the label.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title="Click to copy my Discord username"
      className="inline-flex max-w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 px-5 py-3 text-center text-sm font-semibold text-fg backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent active:translate-y-px"
    >
      {copied ? (
        <>
          <Check size={16} className="text-accent-2" /> Copied!
        </>
      ) : (
        <>
          <DiscordIcon className="h-4 w-4" /> {site.socials.discord}
        </>
      )}
    </button>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent)]"
      />

      <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface/70 p-8 text-center backdrop-blur sm:p-12">
        <span
          aria-hidden
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />

        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-eyebrow text-accent">
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-accent/70" />
          Contact
          <span className="h-px w-7 bg-gradient-to-l from-transparent to-accent/70" />
        </p>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s build something that holds up
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
          I&apos;m open to full-stack engineering roles, Roblox systems work, and focused technical
          audits where the goal is to turn ambiguity into a clear shipping path.
        </p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} className="text-accent-2" /> {site.location}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={`mailto:${site.email}`}>
            <Mail size={16} /> Email me
          </Button>
          <DiscordButton />
          <Button href={site.socials.linkedin} variant="ghost" external>
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
