import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

/** Builds a weaving top-to-bottom path that hugs the content gutters. */
function buildPath(w: number, h: number): string {
  if (w === 0 || h === 0) return ''
  const contentW = Math.min(1152, w - 96)
  const gutter = Math.max((w - contentW) / 4, 28)
  const xLeft = gutter
  const xRight = w - gutter
  const yStart = 140
  const yEnd = h - 220

  const segments = Math.min(Math.max(Math.round((yEnd - yStart) / 950), 3), 12)
  const step = (yEnd - yStart) / segments

  const points: Array<[number, number]> = [[w * 0.62, yStart]]
  for (let i = 1; i < segments; i++) {
    points.push([i % 2 === 1 ? xLeft : xRight, yStart + step * i])
  }
  points.push([w * 0.5, yEnd])

  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const midY = (y0 + y1) / 2
    d += ` C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`
  }
  return d
}

/* Glow = stacked widening strokes, NOT a blur() filter — blurring a page-height
   SVG re-rasterizes every scroll frame and can freeze the renderer. */
const glowLayers = [
  { width: 22, opacity: 0.05 },
  { width: 13, opacity: 0.1 },
  { width: 7, opacity: 0.22 },
]

/** Scroll-linked trail: a glowing gradient line drawn by scroll, tipped with a pulsing comet. */
export default function ScrollTrail() {
  const ref = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  const { scrollYProgress } = useScroll()
  // Tight tracking spring: keeps pace with real scroll speed, only smoothing the
  // discrete wheel steps. restDelta tiny so the tail end settles without a visible snap.
  const progress = useSpring(scrollYProgress, { stiffness: 500, damping: 90, restDelta: 0.0001 })

  const headX = useMotionValue(0)
  const headY = useMotionValue(0)
  const headColor = useTransform(progress, [0, 0.5, 1], ['#0f766e', '#7c3aed', '#db2777'])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const d = buildPath(size.w, size.h)

  useEffect(() => {
    const el = pathRef.current
    if (!el || !d) return
    const total = el.getTotalLength()
    const place = (v: number) => {
      const point = el.getPointAtLength(Math.max(0, Math.min(1, v)) * total)
      headX.set(point.x)
      headY.set(point.y)
    }
    place(progress.get())
    return progress.on('change', place)
  }, [d, progress, headX, headY])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      {d && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="trail-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={size.h}>
              <stop offset="0" style={{ stopColor: 'var(--color-accent-2)' }} />
              <stop offset="0.5" style={{ stopColor: 'var(--color-accent)' }} />
              <stop offset="1" style={{ stopColor: 'var(--color-accent-3)' }} />
            </linearGradient>
          </defs>

          <path ref={pathRef} d={d} stroke="var(--color-border)" strokeWidth="1.5" opacity="0.45" />

          {glowLayers.map((layer) => (
            <motion.path
              key={layer.width}
              d={d}
              stroke="url(#trail-gradient)"
              strokeWidth={layer.width}
              strokeLinecap="round"
              opacity={layer.opacity}
              style={{ pathLength: progress }}
            />
          ))}
          <motion.path
            d={d}
            stroke="url(#trail-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
            style={{ pathLength: progress }}
          />

          <motion.g style={{ x: headX, y: headY }}>
            <motion.circle
              r="12"
              style={{ fill: headColor, transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.16, 0.05, 0.16] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="6"
              style={{ fill: headColor, transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle r="2.8" style={{ fill: headColor }} />
            <circle r="1.2" fill="#ffffff" opacity="0.9" />
          </motion.g>
        </svg>
      )}
    </div>
  )
}
