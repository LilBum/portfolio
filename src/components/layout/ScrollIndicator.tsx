import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { measureRoute } from './measureRoute'
import { buildRoverRoute } from './roverRoute'
import './ScrollIndicator.css'

function getScene(main: HTMLElement) {
  const layout = measureRoute(main)
  return layout && { ...layout, route: buildRoverRoute(layout) }
}
type Scene = NonNullable<ReturnType<typeof getScene>>

function scrollToPosition(value: number) {
  window.scrollTo({ top: value, behavior: 'instant' })
}

function moveWithKeys(event: KeyboardEvent<HTMLButtonElement>) {
  const y = window.scrollY
  const end = document.documentElement.scrollHeight - window.innerHeight
  const step = Math.max(40, end / 100)
  const positions: Record<string, number> = {
    Home: 0, End: end, PageDown: y + window.innerHeight, PageUp: y - window.innerHeight,
    ArrowDown: y + step, ArrowRight: y + step, ArrowUp: y - step, ArrowLeft: y - step,
  }
  if (event.key in positions) {
    event.preventDefault()
    scrollToPosition(positions[event.key])
  }
}

export default function ScrollIndicator() {
  const id = useId()
  const sheet = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLButtonElement>(null)
  const vehicle = useRef<SVGSVGElement>(null)
  const [scene, setScene] = useState<Scene | null>(null)
  const drag = useRef<{ id: number; y: number; scroll: number } | null>(null)

  useEffect(() => {
    const main = sheet.current?.parentElement
    if (!main) return
    let active: Scene | null = null
    let lastY = window.scrollY
    let reversed = false
    let drawFrame = 0
    let measureFrame = 0
    function draw() {
      drawFrame = 0
      if (!active || !handle.current || !vehicle.current) return
      const y = window.scrollY
      if (Math.abs(y - lastY) > 1) reversed = y < lastY
      lastY = y
      const point = active.route.sample(y)
      handle.current.style.transform = 'translate3d(' + point.x.toFixed(2) + 'px,' + point.y.toFixed(2) + 'px,0) translate(-50%,-50%)'
      vehicle.current.style.transform = 'rotate(' + (point.angle + (reversed ? 180 : 0)).toFixed(1) + 'deg)'
      const percent = Math.round(100 * y / Math.max(1, active.maxScroll))
      handle.current.setAttribute('aria-valuenow', String(Math.min(100, Math.max(0, percent))))
    }
    const measure = () => {
      measureFrame = 0
      active = getScene(main)
      setScene(active)
      draw()
    }
    function requestMeasure() {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure)
    }
    function requestDraw() {
      if (!drawFrame) drawFrame = requestAnimationFrame(draw)
    }
    // ResizeObserver delivers an initial measurement after content layout.
    // The decorative route can wait until the main page has rendered.
    const observer = new ResizeObserver(requestMeasure)
    observer.observe(main)
    // An expanded project or a font swap can move the next crossing even if
    // the viewport keeps the same dimensions.
    main.querySelectorAll('section, .hero-intro, #tracking-demo, .project-feature, .project-catalog, .experience-intro, .about-layout, .skills-layout').forEach(el => observer.observe(el))
    window.addEventListener('resize', requestMeasure)
    window.addEventListener('scroll', requestDraw, { passive: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(measureFrame)
      cancelAnimationFrame(drawFrame)
      window.removeEventListener('resize', requestMeasure)
      window.removeEventListener('scroll', requestDraw)
    }
  }, [])

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || event.pointerType === 'touch' || drag.current) return
    drag.current = { id: event.pointerId, y: event.clientY, scroll: window.scrollY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  function scrub(event: PointerEvent<HTMLButtonElement>) {
    const start = drag.current
    if (!scene || !start || start.id !== event.pointerId) return
    const delta = (event.clientY - start.y) / Math.max(1, window.innerHeight)
    scrollToPosition(start.scroll + delta * scene.maxScroll)
  }
  function endDrag(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const start = scene?.route.sample(0)
  const end = scene?.route.sample(scene.maxScroll)
  return (
    <div className="page-route" ref={sheet}>
      {scene && start && end && (
        <svg className="page-route__map" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={id + '-ink'} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={scene.height}>
              <stop stopColor="#7686ae" />
              <stop offset={scene.darkStart} stopColor="#7686ae" />
              <stop offset={scene.darkStart} stopColor="#a4ade3" />
              <stop offset={scene.darkEnd} stopColor="#a4ade3" />
              <stop offset={scene.darkEnd} stopColor="#7686ae" />
              <stop offset={scene.contactStart} stopColor="#7686ae" />
              <stop offset={scene.contactStart} stopColor="#ddd9ff" />
            </linearGradient>
            <path id={id + '-road'} d={scene.route.path} />
          </defs>
          <use href={'#' + id + '-road'} className="page-route__track" stroke={'url(#' + id + '-ink)'} />
          <use href={'#' + id + '-road'} className="page-route__hit" onClick={event => {
            if (!sheet.current) return
            const rect = sheet.current.getBoundingClientRect()
            scrollToPosition(scene.route.nearestScroll(event.clientX - rect.left, event.clientY - rect.top))
          }} />
          {[start, end].map((point, i) => (
            <g key={i} className="page-route__dock" transform={`translate(${point.x} ${point.y})`}>
              <circle r="6" /><circle r="2" />
            </g>
          ))}
        </svg>
      )}
      <button ref={handle} className="page-route__rover" style={{ visibility: scene ? undefined : 'hidden' }}
        type="button" role="slider" aria-label="Page scroll position" aria-orientation="vertical"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}
        title="Drag up or down to scroll the page" onKeyDown={moveWithKeys}
        onPointerDown={startDrag} onPointerMove={scrub} onPointerUp={endDrag} onPointerCancel={endDrag}
        onLostPointerCapture={() => { drag.current = null }}>
        <svg viewBox="0 0 34 23" ref={vehicle} aria-hidden="true" focusable="false">
          <g stroke="#1c2030" strokeWidth="1.3" strokeLinejoin="round">
            <path d="M6 1.5h6v5H6zM21 1.5h6v5h-6zM6 16.5h6v5H6zM21 16.5h6v5h-6z" fill="#1c2030"/>
            <path d="m3 6 3-2h16l7 4v7l-7 4H6l-3-2Z" fill="#fcf5de"/>
            <path d="M9 6h11l4 2.5v6L20 17H9Z" fill="#3653e5"/>
            <path d="M7 8v7m19-6.5v6" fill="none"/>
            <path d="M29 10h3v3h-3" fill="#f4b353"/><circle cx="18" cy="11.5" r="3" fill="#f4b353"/>
          </g>
        </svg>
      </button>
    </div>
  )
}
