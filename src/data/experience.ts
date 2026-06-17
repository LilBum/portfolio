export type Experience = {
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'TSPi',
    location: 'Lynnwood, WA',
    dates: 'Nov 2023 - Present',
    bullets: [
      'Built Angular-based forms and pages used daily by 1,500+ Farm Service Agency loan officers and applicants.',
      'Developed features for a nationwide debt-consolidation system presented to senior FSA and congressional stakeholders.',
      'Built an AWS, Angular, and Node.js financial calculator that reduced manual calculation time by roughly 40%.',
      'Modernized legacy Java/Struts workflows into Angular/Spring Boot features while maintaining extensive Jest coverage across critical front-end components.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'T-Mobile',
    location: 'Bellevue, WA',
    dates: 'Jul-Aug 2021, Jul-Aug 2022',
    bullets: [
      'Built Flask applications integrating external APIs for customer-facing tools.',
      'Mentored two interns in Python, helping each ship two projects where none had previously been completed.',
      'Optimized sorting algorithms and reduced runtime by 50%.',
      'Helped consolidate multiple Sync-Up team data trackers into a single application.',
    ],
  },
]

export const impactStats = [
  { value: '1,500+', label: 'daily users served', detail: 'FSA loan officers and applicants' },
  { value: '95-100%', label: 'test coverage', detail: 'Jest coverage on critical front-end components' },
  { value: '~40%', label: 'manual work cut', detail: 'AWS + Angular financial calculator' },
  { value: '296', label: 'scripts audited', detail: 'live-game security remediation' },
]
