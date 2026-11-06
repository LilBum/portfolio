import { useImperativeHandle, useRef } from 'react'
import type { Ref } from 'react'
import type { RoverRoute, RoverRoutePoint } from './roverRoute'

export type TrailPainter = { route: RoverRoute; draw: (point: RoverRoutePoint) => void }

type Props = {
  route?: RoverRoute
  ink: string
  ref: Ref<TrailPainter | null>
}

// Each bend or lane is a small, static SVG. A translated clip and an equal
// counter-translation expose its ink without repainting the page-height map.
export default function TraveledRoute({ route, ink, ref }: Props) {
  const container = useRef<HTMLDivElement>(null)

  useImperativeHandle<TrailPainter | null, TrailPainter | null>(ref, () => {
    if (!route?.pieces.length || !container.current) return null
    const pieces = route.pieces
    const layers = Array.from(container.current.children, element => {
      const clip = element.firstElementChild as HTMLDivElement
      return { element: element as HTMLDivElement, clip, art: clip.firstElementChild as SVGSVGElement }
    })
    let current = -1
    function draw(point: RoverRoutePoint) {
      let next = Math.max(0, current)
      while (next < pieces.length - 1 && point.distance >= pieces[next].endDistance) next++
      while (next > 0 && point.distance < pieces[next].startDistance) next--
      if (next !== current) {
        for (let i = Math.max(0, Math.min(current, next)); i <= Math.max(current, next); i++) {
          const layer = layers[i]
          layer.element.dataset.state = i < next ? 'done' : i === next ? 'current' : 'ahead'
          layer.clip.style.removeProperty('transform')
          layer.art.style.removeProperty('transform')
        }
        current = next
      }

      const { bounds, direction, startDistance, endDistance } = pieces[next]
      const vertical = direction === 'down'
      const span = vertical ? bounds.bottom - bounds.top : bounds.right - bounds.left
      const fromRight = direction === 'left'
      let shift = vertical ? point.y - bounds.bottom :
        fromRight ? point.x - bounds.left : point.x - bounds.right
      if (point.distance <= startDistance) shift = fromRight ? span : -span
      if (point.distance >= endDistance) shift = 0
      const x = vertical ? 0 : shift
      const y = vertical ? shift : 0
      layers[next].clip.style.transform = `translate3d(${x}px,${y}px,0)`
      layers[next].art.style.transform = `translate3d(${-x}px,${-y}px,0)`
    }

    draw(route.sample(window.scrollY))
    return { route, draw }
  }, [route])

  return (
    <div className="page-route__ink" ref={container} aria-hidden="true">
      {route?.pieces.map((piece, index) => {
        const { left, right, top, bottom } = piece.bounds
        const width = right - left
        const height = bottom - top
        return (
          <div className="page-route__piece" key={index} style={{ left, top, width, height }}>
            <div className="page-route__clip">
              <svg viewBox={`${left} ${top} ${width} ${height}`} preserveAspectRatio="none">
                <path className="page-route__traveled" d={piece.path} stroke={`url(#${ink})`} />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
