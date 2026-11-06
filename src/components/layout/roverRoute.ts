export type RoverRouteInput = {
  width: number
  startY: number
  endY: number
  inset: number
  startX?: number
  startDrift?: number
  endX?: number
  bands: Array<{ top: number; bottom: number; nextX?: number; nextDrift?: number }>
  viewportHeight: number
  mainTop: number
  maxScroll: number
}

export type RoverRoutePoint = { x: number; y: number; angle: number; distance: number }
export type RoverRoutePiece = {
  path: string
  bounds: { left: number; top: number; right: number; bottom: number }
  startDistance: number
  endDistance: number
  direction: 'down' | 'right' | 'left'
}
export type RoverRoute = {
  path: string
  length: number
  pieces: RoverRoutePiece[]
  sample: (scrollY: number) => RoverRoutePoint
  nearestScroll: (x: number, y: number) => number
}

type Point = { x: number; y: number }
type Cubic = [Point, Point, Point, Point]
type Portion = { curves: Cubic[]; scrollStart: number; scrollEnd: number }
type Sample = RoverRoutePoint & { scroll: number }
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value))
const point = (x: number, y: number): Point => ({ x, y })
const gap = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y)

function lane(x: number, top: number, bottom: number, drift: number, width: number, inset: number): Cubic[] {
  if (bottom <= top) return []
  const height = bottom - top
  const lobes = Math.max(1, Math.round(height / 310))
  const amplitude = Math.min(drift, height * 0.24)
  const left = Math.min(x, inset)
  const right = Math.max(x, width - inset)
  const inward = x < width / 2 ? 1 : -1
  const stops = [point(x, top)]
  for (let i = 0; i < lobes; i++) {
    const offset = amplitude * inward * (i % 2 === 0 ? 1 : -1)
    stops.push(point(clamp(x + offset, left, right), top + (i + 0.5) * height / lobes))
  }
  stops.push(point(x, bottom))
  const curves: Cubic[] = []
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    const handle = (b.y - a.y) * 0.38
    curves.push([a, point(a.x, a.y + handle), point(b.x, b.y - handle), b])
  }
  return curves
}

function crossover(x0: number, x1: number, top: number, bottom: number, index: number): Cubic[] {
  const width = Math.abs(x1 - x0)
  const height = bottom - top
  const start = point(x0, top)
  const end = point(x1, bottom)
  if (width < 1) return [[start, point(x0, top + height / 3), point(x1, bottom - height / 3), end]]

  // Draw the two elbows as circular arcs. Their radii depend on the measured
  // band height, so even a very wide crossing starts and ends with a real turn.
  const direction = Math.sign(x1 - x0)
  const early = index % 2 === 0
  const entryRadius = Math.min(height * (early ? 0.29 : 0.36), width * 0.28)
  const exitRadius = Math.min(height * (early ? 0.36 : 0.29), width * 0.28)
  const entryAngle = Math.atan((early ? 0.17 : 0.32) * height / width)
  const exitAngle = Math.atan((early ? 0.32 : 0.17) * height / width)
  const entryHandle = entryRadius * 4 / 3 * Math.tan((Math.PI / 2 - entryAngle) / 4)
  const exitHandle = exitRadius * 4 / 3 * Math.tan((Math.PI / 2 - exitAngle) / 4)
  const a = point(x0 + direction * entryRadius * (1 - Math.sin(entryAngle)), top + entryRadius * Math.cos(entryAngle))
  const b = point(x1 - direction * exitRadius * (1 - Math.sin(exitAngle)), bottom - exitRadius * Math.cos(exitAngle))

  // A shallow S puts more of the descent near its inflection instead of hiding
  // all of it in the elbows. Every control point stays inside the clear band.
  const dx = Math.abs(b.x - a.x)
  const dy = b.y - a.y
  const middle = point(a.x + direction * dx * (early ? 0.41 : 0.57), a.y + dy * (early ? 0.44 : 0.55))
  const midSlope = 3.2 * dy / dx
  const before = Math.min(dx * 0.19, (middle.y - a.y) * 0.65 / midSlope)
  const after = Math.min(dx * 0.19, (b.y - middle.y) * 0.65 / midSlope)
  const shoulderA = Math.min(Math.abs(middle.x - a.x) * 0.40, (middle.y - a.y) * 0.28 / Math.tan(entryAngle))
  const shoulderB = Math.min(Math.abs(b.x - middle.x) * 0.40, (b.y - middle.y) * 0.28 / Math.tan(exitAngle))
  return [
    [start, point(x0, top + entryHandle), point(a.x - direction * entryHandle * Math.cos(entryAngle), a.y - entryHandle * Math.sin(entryAngle)), a],
    [a, point(a.x + direction * shoulderA, a.y + shoulderA * Math.tan(entryAngle)), point(middle.x - direction * before, middle.y - before * midSlope), middle],
    [middle, point(middle.x + direction * after, middle.y + after * midSlope), point(b.x - direction * shoulderB, b.y - shoulderB * Math.tan(exitAngle)), b],
    [b, point(b.x + direction * exitHandle * Math.cos(exitAngle), b.y + exitHandle * Math.sin(exitAngle)), point(x1, bottom - exitHandle), end],
  ]
}

function sampleCurve([a, b, c, d]: Cubic, t: number) {
  const u = 1 - t
  const x = u ** 3 * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t ** 3 * d.x
  const y = u ** 3 * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t ** 3 * d.y
  const dx = u * u * (b.x - a.x) + 2 * u * t * (c.x - b.x) + t * t * (d.x - c.x)
  const dy = u * u * (b.y - a.y) + 2 * u * t * (c.y - b.y) + t * t * (d.y - c.y)
  return { x, y, angle: Math.atan2(dy, dx) * 180 / Math.PI }
}

/** Positions are local to the main overlay. Only scroll and mainTop use document coordinates. */
export function buildRoverRoute(input: RoverRouteInput): RoverRoute {
  const { startY, mainTop } = input
  const width = Math.max(0, input.width)
  const maxScroll = Math.max(0, input.maxScroll)
  const viewport = Math.max(1, input.viewportHeight)
  const endY = Math.max(startY, input.endY)
  const inset = clamp(input.inset, 0, width / 2)
  const startX = clamp(input.startX ?? inset, 0, width)
  const start = { x: startX, y: startY, angle: 90, distance: 0 }
  const move = `M${startX},${startY}`
  if (endY === startY) return { path: move, length: 0, pieces: [], sample: () => ({ ...start }), nearestScroll: () => 0 }

  const baseline = (y: number) => (y - startY) / (endY - startY) * maxScroll
  const screenStart = mainTop + startY
  const screenEnd = mainTop + endY - maxScroll
  const margin = Math.min(36, viewport * 0.12)
  const headerClearance = Math.min(viewport - margin, Math.max(margin, mainTop + 22))
  // A dock can sit closer to the header than the moving rover. Release that
  // concession over the first/last few route pixels, not throughout the page.
  const screenMin = (y: number) => Math.min(headerClearance,
    screenStart + (y - startY) * 0.5,
    screenEnd + (endY - y) * 0.5)
  const screenMax = Math.max(viewport - margin, screenStart, screenEnd)
  // A lookup chord must not cut across a corner of the viewport constraint.
  const floorCorners = [startY + 2 * (headerClearance - screenStart),
    endY - 2 * (headerClearance - screenEnd),
    (startY + endY) / 2 + screenEnd - screenStart]
    .filter(y => y > startY && y < endY).sort((a, b) => a - b)

  // Keep both the rounding into a turn and the horizontal sweep inside the
  // measured clear band. Malformed or overlapping measurements cannot reverse y.
  const bands: RoverRouteInput['bands'] = []
  let previousBottom = startY
  for (const band of [...input.bands].sort((a, b) => a.top - b.top)) {
    const top = Math.max(previousBottom, band.top)
    const bottom = Math.min(endY, band.bottom)
    if (!(bottom - top >= 1)) continue
    bands.push({ ...band, top, bottom })
    previousBottom = bottom
  }

  const portions: Portion[] = []
  let x = startX
  let y = startY
  let scroll = 0
  let measuredLane = input.startX !== undefined
  let laneDrift = input.startDrift
  function addLane(bottom: number, scrollEnd: number) {
    const defaultDrift = measuredLane ? (width < 640 ? 1.25 : 2) : Math.min(inset * 0.18, width < 640 ? 2 : 6)
    const curves = lane(x, y, bottom, Math.max(0, laneDrift ?? defaultDrift), width, inset)
    if (curves.length) portions.push({ curves, scrollStart: scroll, scrollEnd })
  }

  bands.forEach((band, index) => {
    const explicitX = index === bands.length - 1 ? input.endX ?? band.nextX : band.nextX
    const nextX = clamp(explicitX ?? (x < width / 2 ? width - inset : inset), 0, width)
    const from = baseline(band.top)
    const to = baseline(band.bottom)
    // Borrow less than half of either neighboring leg. Consecutive crossovers
    // can never exhaust the scroll interval of the lane between them.
    const desired = Math.min(330, viewport * 0.46, Math.abs(nextX - x) * 0.40 + 65)
    const extra = Math.max(0, desired - (to - from))
    const before = Math.max(0, Math.min((from - baseline(y)) * 0.45, screenMax - (mainTop + band.top - from)))
    const nextTop = bands[index + 1]?.top ?? endY
    const after = Math.max(0, Math.min((baseline(nextTop) - to) * 0.45, mainTop + band.bottom - to - screenMin(band.bottom)))
    const lead = Math.min(before, Math.max(extra / 2, extra - after))
    const tail = Math.min(after, extra - lead)
    addLane(band.top, from - lead)
    portions.push({ curves: crossover(x, nextX, band.top, band.bottom, index), scrollStart: from - lead, scrollEnd: to + tail })
    x = nextX
    y = band.bottom
    scroll = to + tail
    measuredLane = explicitX !== undefined
    laneDrift = band.nextDrift
  })
  // Without a clear band, stay in the starting lane all the way to the dock.
  addLane(endY, maxScroll)

  const samples: Sample[] = [{ ...start, scroll: 0 }]
  const pieces: RoverRoutePiece[] = []
  const commands = [move]
  let corner = 0
  for (const portion of portions) {
    const from = samples.length - 1
    const commandStart = commands.length
    const first = portion.curves[0][0]
    const end = portion.curves[portion.curves.length - 1][3]
    const dx = end.x - first.x
    const sign = Math.sign(dx)
    let horizontal = Math.abs(dx) > end.y - first.y
    const bounds = { left: first.x - 3, top: first.y - 3, right: first.x + 3, bottom: first.y + 3 }
    for (const curve of portion.curves) {
      const [a, b, c, d] = curve
      commands.push(`C${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`)
      // A cubic stays inside its control hull. Ordered controls also guarantee
      // that revealing by x never uncovers a later part of the same curve.
      for (let j = 1; j < curve.length; j++) {
        const p = curve[j]
        bounds.left = Math.min(bounds.left, p.x - 3)
        bounds.top = Math.min(bounds.top, p.y - 3)
        bounds.right = Math.max(bounds.right, p.x + 3)
        bounds.bottom = Math.max(bounds.bottom, p.y + 3)
        if ((p.x - curve[j - 1].x) * sign < 0) horizontal = false
      }
      const count = clamp(Math.ceil((gap(a, b) + gap(b, c) + gap(c, d)) / 10), 12, 180)
      for (let i = 1; i <= count; i++) {
        const current = sampleCurve(curve, i / count)
        const prev = samples[samples.length - 1]
        const length = gap(prev, current)
        while (corner < floorCorners.length && floorCorners[corner] <= current.y) {
          const y = floorCorners[corner++]
          if (y <= samples[samples.length - 1].y || y === current.y) continue
          const fraction = (y - prev.y) / (current.y - prev.y)
          samples.push({ x: prev.x + fraction * (current.x - prev.x), y,
            angle: prev.angle + fraction * (current.angle - prev.angle),
            distance: prev.distance + fraction * length, scroll: 0 })
        }
        samples.push({ ...current, distance: prev.distance + length, scroll: 0 })
      }
    }
    const startDistance = samples[from].distance
    const endDistance = samples[samples.length - 1].distance
    const length = endDistance - startDistance
    pieces.push({
      path: `M${first.x},${first.y} ${commands.slice(commandStart).join(' ')}`,
      bounds, startDistance, endDistance,
      direction: horizontal ? (dx > 0 ? 'right' : 'left') : 'down',
    })
    for (let i = from + 1; i < samples.length; i++) {
      const s = samples[i]
      const fraction = (s.distance - startDistance) / length
      const proposed = portion.scrollStart + fraction * (portion.scrollEnd - portion.scrollStart)
      s.scroll = clamp(proposed, Math.max(0, mainTop + s.y - screenMax), Math.min(maxScroll, mainTop + s.y - screenMin(s.y)))
    }
  }
  const last = samples[samples.length - 1]
  last.scroll = maxScroll

  function sample(scrollY: number): RoverRoutePoint {
    if (scrollY <= 0 || maxScroll === 0) return { ...start }
    if (scrollY >= maxScroll) return { x: last.x, y: last.y, angle: last.angle, distance: last.distance }
    let low = 0
    let high = samples.length - 1
    while (high - low > 1) {
      const middle = (low + high) >>> 1
      if (samples[middle].scroll <= scrollY) low = middle
      else high = middle
    }
    const a = samples[low]
    const b = samples[high]
    const t = (scrollY - a.scroll) / (b.scroll - a.scroll)
    return {
      x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y),
      angle: a.angle + t * (b.angle - a.angle),
      distance: a.distance + t * (b.distance - a.distance),
    }
  }

  function nearestScroll(px: number, py: number) {
    let best = Infinity
    let result = 0
    for (let i = 1; i < samples.length; i++) {
      const a = samples[i - 1]
      const b = samples[i]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const t = clamp(((px - a.x) * dx + (py - a.y) * dy) / (dx * dx + dy * dy), 0, 1)
      const error = (px - a.x - dx * t) ** 2 + (py - a.y - dy * t) ** 2
      if (error < best) {
        best = error
        result = a.scroll + t * (b.scroll - a.scroll)
      }
    }
    return result
  }

  return { path: commands.join(' '), length: last.distance, pieces, sample, nearestScroll }
}
