export type Accent = 'violet' | 'teal' | 'pink'

export type ArchitectureNode = {
  label: string
  detail: string
}

export type ArchitectureVisual = {
  eyebrow: string
  badge?: string
  entry: ArchitectureNode
  core: ArchitectureNode
  services: ArchitectureNode[]
  footer?: string
}

export type Project = {
  art: 'lending' | 'homes' | 'listing' | 'trading' | 'multiplayer'
  id: string
  title: string
  category: string
  year: string
  blurb: string
  tags: string[]
  details?: string[]
  image?: { src: string; alt: string }
  href?: string
  hrefLabel?: string
  caseStudy?: string
}

export const projects: Project[] = [
  {
    id: 'fsa-project',
    art: 'lending',
    title: 'FSA debt consolidation',
    category: 'Federal lending',
    year: '2023–26',
    blurb: 'At TSPi, I built screens for the USDA Farm Service Agency that helped people work through debt consolidation. What a person could enter depended on their role and the rules for that loan.',
    tags: ['Angular', 'Node.js', 'AWS Lambda', 'Spring Boot'],
    details: [
      'I connected the Angular screens to existing lending services and built a financial calculator to reduce the manual arithmetic.',
      'I helped migrate a Java/Struts application to Angular and Spring Boot, with Jest tests covering the modules I owned.',
    ],
  },
  {
    id: 'home-care-project',
    art: 'homes',
    title: 'A&D Home Care and Aging with Grace',
    category: 'Client website',
    year: '2026',
    blurb: 'Families needed to see whether either of two adult family homes had an open room. I built a site for the homes in Lynnwood and Everett and gave the owners a form they could use to update availability themselves.',
    tags: ['React', 'TypeScript', 'Google Apps Script', 'Cloudflare Workers'],
    details: [
      'I worked with the owners from the initial requirements and photography through the launch on their own domain.',
      'A Google Form feeds a Sheet. A Cloudflare Worker checks the availability data and lets old listings expire.',
    ],
    image: {
      src: '/ad-home-care-production.webp',
      alt: 'A&D Home Care and Aging with Grace website for the Lynnwood and Everett homes',
    },
    href: 'https://kingsgateafh.org',
    hrefLabel: 'Visit the site',
  },
  {
    id: 'listing-project',
    art: 'listing',
    title: 'Listing Studio',
    category: 'Commerce software',
    year: '2026',
    blurb: 'I built a private workspace for a digital-products business. The owner can prepare product listings, check them for errors, and connect the Etsy and YouTube accounts from one place.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    details: ['I also built account recovery and the permissions for connecting each marketplace account.'],
  },
  {
    id: 'trading-project',
    art: 'trading',
    title: 'AegisTrader',
    category: 'Paper trading',
    year: '2026',
    blurb: 'I built an options paper-trading system to test what happens when a broker disconnects or returns stale account data. The program records why it blocked an order, and its shutdown controls survive a restart.',
    tags: ['Python', 'Interactive Brokers API', 'SQLite'],
    details: ['I tested orders in an Interactive Brokers paper account and checked the saved records after restarting the program.'],
  },
  {
    id: 'multiplayer-project',
    art: 'multiplayer',
    title: 'Multiplayer economies on Roblox',
    category: 'Game systems',
    year: '2026',
    blurb: 'If a player disconnects halfway through a trade, who owns the item? I worked on saving player progress and checking both sides of a trade before it goes through. I also audited a client game for ways players could exploit its systems.',
    tags: ['Luau', 'Roblox DataStore'],
    caseStudy: '#/case-study/roblox-audit',
  },
]
