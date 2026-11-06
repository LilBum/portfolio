import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import type { KeyboardEvent, MouseEvent } from 'react'
import './TrackingConsole.css'

type Point = { x: number; y: number }
type Simulation = {
  robot: Point
  heading: number
  velocity: Point
  reading: Point
  target: Point
  trail: Point[]
  step: number
  held: boolean
}

const width = 400
const height = 222
const dt = 1 / 24
const stepMs = dt * 1000
const maxStepsPerTick = 4
const targets: Point[] = [{ x: 335, y: 61 }, { x: 88, y: 46 }, { x: 160, y: 164 }, { x: 319, y: 149 }]
const bounds = (value: number, max: number) => Math.max(16, Math.min(max - 16, value))

function headingAfterMove(state: Simulation, robot: Point) {
  const dx = robot.x - state.robot.x
  const dy = robot.y - state.robot.y
  if (Math.hypot(dx, dy) < 7 * dt) return state.heading
  const desired = Math.atan2(dy, dx) * 180 / Math.PI
  const turn = (desired - state.heading + 540) % 360 - 180
  return (state.heading + Math.max(-14, Math.min(14, turn)) + 360) % 360
}

// An invented point model in screen units. The changing drift makes the
// difference between steering on a fresh reading and a frozen one observable.
function advance(state: Simulation): Simulation {
  const dx = state.target.x - state.reading.x
  const dy = state.target.y - state.reading.y
  const gain = Math.min(2.7, 83 / Math.max(1, Math.hypot(dx, dy)))
  const time = state.step * dt
  const desiredX = gain * dx + 10 * Math.sin(0.95 * time)
  const desiredY = gain * dy + 9 * Math.cos(0.73 * time)
  const velocity = {
    x: state.velocity.x + 2.1 * dt * (desiredX - state.velocity.x),
    y: state.velocity.y + 2.1 * dt * (desiredY - state.velocity.y),
  }
  const robot = { x: bounds(state.robot.x + velocity.x * dt, width), y: bounds(state.robot.y + velocity.y * dt, height) }
  const last = state.trail[state.trail.length - 1]
  const trail = Math.hypot(robot.x - last.x, robot.y - last.y) >= 2.5 ? [...state.trail.slice(-179), robot] : state.trail
  return { ...state, robot, heading: headingAfterMove(state, robot), velocity, reading: state.held ? state.reading : robot, trail, step: state.step + 1 }
}

function startSimulation(): Simulation {
  const start = { x: 40, y: 165 }
  let state: Simulation = { robot: start, heading: 0, reading: start, velocity: { x: 0, y: 0 }, target: start, trail: [start], step: 0, held: false }
  // Pre-roll the same simulation through turns so its first frame has a trail.
  const warmup = [
    { target: targets[1], steps: 43 }, { target: { x: 200, y: 83 }, steps: 44 },
    { target: targets[2], steps: 35 }, { target: targets[3], steps: 36 },
    { target: targets[0], steps: 12 },
  ]
  for (const segment of warmup) {
    state = { ...state, target: segment.target }
    for (let step = 0; step < segment.steps; step++) state = advance(state)
  }
  return state
}

function nextTarget(state: Simulation): Simulation {
  const current = targets.findIndex((target) => target.x === state.target.x && target.y === state.target.y)
  return { ...state, target: targets[(current + 1) % targets.length] }
}

function switchReading(state: Simulation, held: boolean): Simulation {
  return state.held === held ? state : { ...state, held, reading: state.robot }
}

const directions: Record<string, Point> = {
  ArrowLeft: { x: -16, y: 0 },
  ArrowRight: { x: 16, y: 0 },
  ArrowUp: { x: 0, y: -16 },
  ArrowDown: { x: 0, y: 16 },
}

// The two cameras sit on a short neck at the front of the chassis. All of the
// drawing is static; only its outside translation and rotation change.
const rover = (
  <g stroke="#192637" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
    <rect x="-19" y="-18.5" width="38" height="9" rx="4" fill="#354968" stroke="#c6d4de" />
    <rect x="-19" y="9.5" width="38" height="9" rx="4" fill="#354968" stroke="#c6d4de" />
    <path d="M-13 -17v6m7-6v6m7-6v6m7-6v6m7-6v6 M-13 11v6m7-6v6m7-6v6m7-6v6m7-6v6" fill="none" stroke="#90a9c8" strokeWidth="1.9" />
    <path d="M-19 -8 -14 -13 H8 L16 -7 V7 L8 13 H-14 L-19 8Z" fill="#f2e7c6" />
    <path d="M-14 -8 H1 L6 -4 V4 L1 8 H-14Z" fill="#8097e5" />
    <path d="M-10 -4v8m4-8v8" stroke="#38466b" />
    <path d="M9 -4 H21 V4 H9Z" fill="#556782" />
    <rect x="16" y="-13" width="15" height="26" rx="4.6" fill="#f1a478" />
    <rect x="21" y="-9.5" width="7.8" height="19" rx="3.4" fill="#263e4d" stroke="none" />
    <g fill="#ddfff0" stroke="none"><circle cx="25" cy="-5" r="2.15" /><circle cx="25" cy="5" r="2.15" /></g>
    <circle cx="8" cy="0" r="3.1" fill="#f9bf80" />
  </g>
)

export default function TrackingConsole() {
  const [state, setState] = useState(startSimulation)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const board = useRef<SVGSVGElement>(null)
  const clock = useRef({ last: 0, remainder: 0 })
  const id = useId()

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectMotion = () => { if (preference.matches) setPlaying(false) }
    preference.addEventListener('change', respectMotion)
    return () => preference.removeEventListener('change', respectMotion)
  }, [])

  useEffect(() => {
    const screen = board.current
    if (!screen || !playing) return
    let inView = false
    let timer: number | undefined
    const tick = () => {
      const now = performance.now()
      const elapsed = clock.current.remainder + (now - clock.current.last)
      const available = Math.min(elapsed, maxStepsPerTick * stepMs)
      const steps = Math.floor(available / stepMs)
      clock.current = { last: now, remainder: available - steps * stepMs }
      if (steps > 0) setState((current) => {
        let next = current
        for (let i = 0; i < steps; i++) next = advance(next)
        return next
      })
    }
    const sync = () => {
      window.clearInterval(timer)
      clock.current = { last: performance.now(), remainder: 0 }
      if (inView && !document.hidden) timer = window.setInterval(tick, stepMs)
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    observer.observe(screen)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [playing])

  function resetSimulation() {
    clock.current = { last: performance.now(), remainder: 0 }
    setState(startSimulation())
  }

  function setTarget(event: MouseEvent<HTMLButtonElement>) {
    if (event.detail === 0) {
      setState(nextTarget)
      return
    }
    const transform = board.current?.getScreenCTM()
    if (!transform) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse())
    setState((current) => ({ ...current, target: { x: bounds(point.x, width), y: bounds(point.y, height) } }))
  }

  function moveWithKeys(event: KeyboardEvent<HTMLButtonElement>) {
    const direction = directions[event.key]
    if (!direction || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    event.preventDefault()
    setState((current) => ({
      ...current,
      target: {
        x: bounds(current.target.x + direction.x, width),
        y: bounds(current.target.y + direction.y, height),
      },
    }))
  }

  const { robot, reading, target, held } = state
  const history = useMemo(() => state.trail.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' '), [state.trail])
  const path = `${history} L${robot.x.toFixed(1)} ${robot.y.toFixed(1)}`
  return (
    <figure id="tracking-demo" className="tracking-console" tabIndex={-1} aria-label="Synthetic feedback demo">
      <div className="tracking-console__field" aria-hidden="true" />
      <div className="tracking-console__machine">
        <div className="tracking-console__header">
          <span className="tracking-console__stripes" aria-hidden="true" />
          <span>Feedback console</span>
          <span className="tracking-console__vents" aria-hidden="true" />
          <button type="button" className="tracking-console__reset" aria-label="Reset simulation" title="Reset simulation" onClick={resetSimulation}><RotateCcw aria-hidden="true" size={13} /></button>
        </div>
        <div className="tracking-console__bezel">
          <button type="button" className="tracking-console__glass" aria-label="Set target on the board. Arrow keys move it. Enter chooses another target." aria-describedby={`${id}-instructions`} onClick={setTarget} onKeyDown={moveWithKeys}>
            <svg ref={board} viewBox="-46 -28 492 278" aria-hidden="true" className="tracking-console__board">
              <defs>
                <linearGradient id={`${id}-trail`} x1="0" x2="1" y1="0" y2="0">
                  <stop stopColor="#648ea5" /><stop offset="0.42" stopColor="#85d6b1" /><stop offset="1" stopColor="#bef6af" />
                </linearGradient>
              </defs>
              <path d="M14 31 V14 H31 M369 14 H386 V31 M386 191 V208 H369 M31 208 H14 V191" fill="none" stroke="#8cafbf" strokeOpacity="0.58" />
              <path className="tracking-console__trace" d={path} fill="none" stroke={`url(#${id}-trail)`} strokeWidth="1.6" strokeOpacity="0.57" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={reading.x} y1={reading.y} x2={target.x} y2={target.y} stroke="#ffc67c" strokeOpacity="0.75" strokeWidth="1.7" strokeDasharray="3 5" />
              <g className="tracking-console__target" transform={`translate(${target.x} ${target.y})`} fill="none" stroke="#ffbf78">
                <path d="M0 -10 10 0 0 10 -10 0Z" fill="#21303a" strokeWidth="2.6" />
                <path d="M0 -15 V-11 M11 0 H15 M0 11 V15 M-11 0 H-15" strokeWidth="1.6" />
                <circle r="2.4" fill="#ffcf8a" stroke="none" />
                {Math.hypot(robot.x - target.x, robot.y - target.y) < 31 && (
                  <path d="M-29 -21v-8h8m42 0h8v8m0 42v8h-8m-42 0h-8v-8" strokeWidth="1.6" />
                )}
              </g>
              {held && <g className="tracking-console__reading" transform={`translate(${reading.x} ${reading.y})`} fill="none" stroke="#d9c4ff" strokeWidth="1.8">
                <circle r="27" strokeDasharray="3 4" /><path d="M-6 0 H6 M0 -6 V6" />
              </g>}
              <g className="tracking-console__robot" transform={`translate(${robot.x} ${robot.y})`}>
                <g transform={`rotate(${state.heading.toFixed(1)}) scale(1.22)`}>{rover}</g>
              </g>
            </svg>
          </button>
        </div>
        <div className="tracking-console__legend" aria-hidden="true">
          <span><svg className="tracking-console__rover-key" viewBox="-22 -22 56 44">{rover}</svg>Robot</span>
          <span><i className="tracking-console__target-symbol" />Target</span>
          {held && <span><i className="tracking-console__held-symbol" />Held reading</span>}
        </div>
        <div className="tracking-console__controls">
          <div role="group" aria-label="Position reading" className="tracking-console__keys">
            <button type="button" aria-label="Live position reading" aria-pressed={!held} onClick={() => setState((current) => switchReading(current, false))}>Live</button>
            <button type="button" aria-label="Hold position reading" aria-pressed={held} onClick={() => setState((current) => switchReading(current, true))}>Hold</button>
          </div>
          <button type="button" className="tracking-console__next" onClick={() => setState(nextTarget)}>New target</button>
          <button type="button" className="tracking-console__playback" aria-label={playing ? 'Pause simulation' : 'Resume simulation'} title={playing ? 'Pause simulation' : 'Resume simulation'} onClick={() => setPlaying((value) => !value)}>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
        </div>
        <span aria-hidden="true" className="tracking-console__screw tracking-console__screw--left" />
        <span aria-hidden="true" className="tracking-console__screw tracking-console__screw--right" />
      </div>
      <figcaption className="tracking-console__caption" id={`${id}-instructions`}>
        <strong>Synthetic demo</strong>
        <span>Choose a target on the screen. Live steers with the robot’s current position. Hold steers from its last reading.</span>
      </figcaption>
      <span className="sr-only" aria-live="polite">Target at {Math.round(target.x)}, {Math.round(target.y)}. {held ? 'Holding the last reading.' : 'Using live readings.'}</span>
    </figure>
  )
}
