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
      'Developed and maintained a nationwide debt consolidation system recognized at the congressional level.',
      'Built an AWS, Angular, and Node.js financial calculator that reduced manual calculation time by roughly 40%.',
      'Migrated a 10+ year-old Java Struts application to Spring MVC/Boot and Hibernate while maintaining 10,000+ unit tests.',
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
  { value: '95-100%', label: 'test coverage', detail: 'Jest coverage across production modules' },
  { value: '10,000+', label: 'tests preserved', detail: 'during a legacy Java migration' },
  { value: '296', label: 'Roblox scripts audited', detail: 'for Horror Elevator remediation' },
]
