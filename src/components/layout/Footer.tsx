import { useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { site } from '../../data/site'
import { DiscordIcon, LinkedInIcon } from '../ui/Icons'

const iconLink =
  'inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted transition-colors hover:border-accent/60 hover:text-fg'

function DiscordCopy() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.socials.discord)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable - the handle stays visible in the tooltip.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy Discord username"
      title={`Discord: ${site.socials.discord} (click to copy)`}
      className={`${iconLink} cursor-pointer`}
    >
      {copied ? <Check size={15} className="text-accent-2" /> : <DiscordIcon className="h-4 w-4" />}
    </button>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/70 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-muted sm:flex-row">
        <p>
          Copyright {year} {site.name}. Built with React, Vite, and Tailwind.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DiscordCopy />
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className={iconLink}>
              <Mail size={15} />
            </a>
          </div>
          <a href="#top" className="transition-colors hover:text-fg">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
