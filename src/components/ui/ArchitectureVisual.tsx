import { Boxes, LockKeyhole } from 'lucide-react'
import type { Accent, ArchitectureVisual as ArchitectureVisualData } from '../../data/projects'
import { cn } from '../../lib/cn'

const accentBorder: Record<Accent, string> = {
  violet: 'border-accent/45 bg-accent/10',
  teal: 'border-accent-2/45 bg-accent-2/10',
  pink: 'border-accent-3/45 bg-accent-3/10',
}

const accentText: Record<Accent, string> = {
  violet: 'text-accent',
  teal: 'text-accent-2',
  pink: 'text-accent-3',
}

const accentLine: Record<Accent, string> = {
  violet: 'bg-accent/35',
  teal: 'bg-accent-2/35',
  pink: 'bg-accent-3/35',
}

type Props = {
  visual: ArchitectureVisualData
  accent: Accent
}

export default function ArchitectureVisual({ visual, accent }: Props) {
  return (
    <figure
      className="flex h-full w-full flex-col justify-center rounded-2xl border border-border/80 bg-bg/70 p-4 shadow-sm backdrop-blur-sm"
      aria-label={`${visual.entry.label} flows through ${visual.core.label} to ${visual.services.map((service) => service.label).join(' and ')}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-muted sm:text-[10px]">
          {visual.eyebrow}
        </p>
        {visual.badge && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wide',
              accentBorder[accent],
              accentText[accent],
            )}
          >
            <LockKeyhole size={10} /> {visual.badge}
          </span>
        )}
      </div>

      <div className="mx-auto w-[72%] rounded-xl border border-border bg-surface/90 px-3 py-2.5 text-center">
        <p className="text-xs font-bold text-fg">{visual.entry.label}</p>
        <p className="mt-0.5 font-mono text-[9px] text-muted">{visual.entry.detail}</p>
      </div>

      <span aria-hidden className={cn('mx-auto h-3 w-px', accentLine[accent])} />

      <div className={cn('mx-auto w-[86%] rounded-xl border px-3 py-3 text-center', accentBorder[accent])}>
        <Boxes size={15} className={cn('mx-auto mb-1', accentText[accent])} />
        <p className="text-xs font-bold text-fg">{visual.core.label}</p>
        <p className="mt-0.5 font-mono text-[9px] text-muted">{visual.core.detail}</p>
      </div>

      <div aria-hidden className="mx-auto h-3 w-1/2 border-x border-t border-border/90" />

      <div className="grid grid-cols-2 gap-2">
        {visual.services.map((service) => (
          <div key={service.label} className="rounded-xl border border-border bg-surface/90 px-2 py-2.5 text-center">
            <p className="text-[11px] font-bold text-fg">{service.label}</p>
            <p className="mt-0.5 font-mono text-[8px] leading-relaxed text-muted sm:text-[9px]">
              {service.detail}
            </p>
          </div>
        ))}
      </div>

      {visual.footer && (
        <figcaption className="mt-3 text-center font-mono text-[9px] leading-relaxed text-muted">
          {visual.footer}
        </figcaption>
      )}
    </figure>
  )
}
