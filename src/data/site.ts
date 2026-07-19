export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  url: 'https://alexanderursbadet.com',
  role: 'Full-Stack Software Engineer',
  specialty:
    'Production Angular/AWS web applications end to end, with independent depth in computer vision, quant systems, and reverse engineering',
  tagline:
    'I build and ship production web software: Angular and AWS systems used daily by roughly 1,500 federal loan officers and applicants. Outside work I go deeper on systems - computer vision for a research lab, a risk-first trading bot, and a reverse-engineered game server.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  resumeUrl: '/Alexander-Urs-Badet-Resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/alex-urs-badet-1a09a2220/',
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
