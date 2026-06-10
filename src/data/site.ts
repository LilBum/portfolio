export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  role: 'Full-Stack Software Engineer',
  specialty: 'Angular/AWS applications, Roblox systems, and technical audits',
  tagline:
    'I build production web applications for regulated environments and Roblox game systems with durable data, secure server logic, and polished player-facing UI.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  socials: {
    github: 'https://github.com/LilBum',
    linkedin: 'https://www.linkedin.com/in/alex-urs-badet-1a09a2220/',
    discord: 'lilbum123',
    roblox: 'https://www.roblox.com/users/857636663/profile',
  },
} as const

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
