export type Experience = {
  role: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'TSPi',
    location: 'Lynnwood, WA',
    dates: 'Nov 2023 - Present',
    bullets: [
      'Build and maintain Angular-based loan workflows used by roughly 1,500 FSA loan officers and applicants.',
      'Shipped debt-consolidation screens demoed to senior FSA staff and congressional contacts.',
      'Built an AWS, Angular, and Node.js financial calculator that reduced a mostly manual workflow by ~40%.',
      'Migrated legacy Java/Struts modules toward Angular and Spring Boot while maintaining high Jest coverage on owned front-end modules.',
      'Previously favorably adjudicated for a USDA Public Trust contractor position.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'T-Mobile',
    location: 'Bellevue, WA',
    dates: 'Two summer internships, 2021-2022',
    bullets: [
      'Built Python/Flask tools around internal APIs and team workflows.',
      'Mentored two Python interns through code review, debugging, and delivery of independent projects.',
      'Profiled and optimized a slow sorting path, roughly doubling runtime performance.',
      'Consolidated scattered Sync-Up tracking workflows into a unified internal application.',
    ],
  },
];

export const impactStats = [
  { value: '1,500+', label: 'users served', detail: 'FSA loan workflows' },
  {
    value: '95-100%',
    label: 'Jest coverage',
    detail: 'front-end modules owned',
  },
  {
    value: '~40%',
    label: 'manual work reduced',
    detail: 'AWS + Angular finance calculator',
  },
  {
    value: '296',
    label: 'scripts audited',
    detail: 'live-game security remediation',
  },
];
