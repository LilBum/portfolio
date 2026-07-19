import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { impactStats } from '../../data/experience'
import Reveal from '../ui/Reveal'

/** Animates the numeric part of a stat (e.g. "1,500+" or "95-100%") from 0 once visible. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
  const numericParts = value.match(/\d[\d,.]*/g) ?? []
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const raw = match?.[2] ?? ''
  const target = raw ? parseFloat(raw.replace(/,/g, '')) : NaN
  const animatable = numericParts.length === 1 && !Number.isNaN(target)

  // Start at the real value so non-scrolling renderers (crawlers) never see
  // "0"; the tween's first frame resets it once the strip actually animates.
  const [display, setDisplay] = useState(raw || '0')

  // rAF tween instead of framer's animate(): runs even when the OS prefers reduced motion.
  useEffect(() => {
    if (!inView || !animatable) return
    const duration = 1300
    const start = performance.now()
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
    let frame: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const v = Math.round(easeOut(t) * target)
      setDisplay(raw.includes(',') ? v.toLocaleString('en-US') : String(v))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, animatable, target, raw])

  if (!match || !animatable) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {animatable ? display : raw}
      {match[3]}
    </span>
  )
}

export default function ImpactStrip() {
  return (
    <section aria-label="Impact highlights" className="border-y border-border/70 bg-surface/55 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {impactStats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.04}
            className="rounded-2xl border border-border bg-bg/45 p-5 transition-colors hover:border-accent/40"
          >
            <div className="font-display text-3xl font-bold tracking-tight text-accent">
              <CountUp value={stat.value} />
            </div>
            <div className="mt-1.5 text-sm font-semibold text-fg">{stat.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-muted">{stat.detail}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
