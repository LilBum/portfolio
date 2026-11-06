import type { KeyboardEvent, RefObject } from 'react'
import './ScrollIndicator.css'

type Props = {
  trackRef: RefObject<HTMLDivElement | null>
  controlRef: RefObject<HTMLInputElement | null>
}

function scrollPage(percent: number) {
  const distance = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: Math.max(0, distance) * Math.min(100, Math.max(0, percent)) / 100, behavior: 'instant' })
}

function moveWithKeys(event: KeyboardEvent<HTMLInputElement>) {
  const distance = document.documentElement.scrollHeight - window.innerHeight
  const position = distance > 0 ? window.scrollY / distance * 100 : 0
  const pageStep = distance > 0 ? window.innerHeight / distance * 100 : 100
  const keys: Record<string, number> = {
    ArrowDown: position + 1,
    ArrowRight: position + 1,
    ArrowUp: position - 1,
    ArrowLeft: position - 1,
    PageDown: position + pageStep,
    PageUp: position - pageStep,
    Home: 0,
    End: 100,
  }
  if (event.key in keys) {
    event.preventDefault()
    scrollPage(keys[event.key])
  }
}

export default function ScrollIndicator({ trackRef, controlRef }: Props) {
  return (
    <div className="scroll-indicator" ref={trackRef}>
      <div className="scroll-indicator__path" aria-hidden="true">
        <span className="scroll-indicator__trail" />
        <span className="scroll-indicator__carrier">
          <svg viewBox="0 0 34 23" className="scroll-indicator__rover" focusable="false">
            <g stroke="#1c2030" strokeWidth="1.3" strokeLinejoin="round">
              <path d="M6 1.5h6v5H6zM21 1.5h6v5h-6zM6 16.5h6v5H6zM21 16.5h6v5h-6z" fill="#1c2030" />
              <path d="m3 6 3-2h16l7 4v7l-7 4H6l-3-2Z" fill="#fcf5de" />
              <path d="M9 6h11l4 2.5v6L20 17H9Z" fill="#3653e5" />
              <path d="M7 8v7m19-6.5v6" fill="none" />
              <path d="M29 10h3v3h-3" fill="#f4b353" />
              <circle cx="18" cy="11.5" r="3" fill="#f4b353" />
            </g>
          </svg>
        </span>
      </div>
      <input
        ref={controlRef}
        type="range" min="0" max="100" step="0.1" defaultValue="0"
        aria-label="Page scroll position" aria-orientation="vertical"
        title="Drag to scroll the page"
        className="scroll-indicator__control"
        onInput={(event) => scrollPage(event.currentTarget.valueAsNumber)}
        onKeyDown={moveWithKeys}
      />
    </div>
  )
}
