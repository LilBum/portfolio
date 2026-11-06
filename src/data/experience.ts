type Period = {
  start: string
  end?: string
}

export type Experience = {
  id: string
  role: string
  company: string
  shortCompany?: string
  location: string
  dates: string
  periods: Period[]
  bullets: string[]
  demo?: { href: string; label: string }
  impact?: typeof impactStats
  footnote?: string
}

export const impactStats = [
  { value: '1,500+', label: 'FSA staff and applicants', detail: 'Using the loan workflows I owned' },
  { value: '40%', label: 'less manual calculation overhead', detail: 'With the financial calculator I built' },
  { value: '98%', label: 'Jest coverage', detail: 'On the Angular modules I owned' },
]

export const experience: Experience[] = [
  {
    id: 'uw',
    company: 'University of Washington',
    shortCompany: 'UW',
    role: 'Undergraduate Researcher · Behavioral Neuroscience',
    location: 'Seattle, WA',
    dates: 'Aug 2025 – present',
    periods: [{ start: '2025-08' }],
    bullets: [
      'I used Python and DeepLabCut to train models that track movement in video. I wrote C# components for Bonsai so the tracking and experiment software could exchange data.',
      'I built closed-loop controls that use live updates from the lab’s existing tracker to adjust the robot’s next move. I also built the interface researchers use to run and review a session.',
    ],
    demo: { href: '#tracking-demo', label: 'Try a simulated feedback loop' },
  },
  {
    id: 'tspi',
    company: 'TSPi',
    role: 'Software Engineer',
    location: 'Lynnwood, WA',
    dates: 'Nov 2023 – Jul 2026',
    periods: [{ start: '2023-11', end: '2026-07' }],
    bullets: [
      'I built federal loan workflows and a financial calculator for USDA’s Farm Service Agency. I also helped move a decade-old application from Java/Struts to Angular and Spring Boot.',
    ],
    impact: impactStats,
    footnote: 'USDA favorably adjudicated my Public Trust for this contractor role.',
  },
  {
    id: 't-mobile',
    company: 'T-Mobile',
    role: 'Software Engineering Intern',
    location: 'Bellevue, WA',
    dates: 'Summers 2021 & 2022',
    periods: [
      { start: '2021-07', end: '2021-08' },
      { start: '2022-07', end: '2022-08' },
    ],
    bullets: [
      'Across two summers, I brought scattered Sync-Up workflows into one internal app and cut the runtime of a sorting routine in half. I also mentored two Python interns through code reviews and debugging.',
    ],
  },
]
