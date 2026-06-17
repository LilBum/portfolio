export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  role: 'Full-Stack Software Engineer',
  specialty: 'Angular/AWS web apps, with side projects in computer vision, robotics, and algorithmic trading',
  tagline:
    'I build production web applications for regulated environments - and on my own time, real-time computer-vision and robotics systems, an algorithmic options-trading engine, and server-authoritative game systems. Full-stack by trade, with real hands-on experience across AI/ML and systems work.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  resumeUrl: '/Alexander-Urs-Badet-Resume.pdf',
  socials: {
    github: 'https://github.com/LilBum',
    linkedin: 'https://www.linkedin.com/in/alex-urs-badet-1a09a2220/',
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
