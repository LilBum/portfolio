export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  url: 'https://alexub-portfolio.vercel.app',
  role: 'Full-Stack Software Engineer',
  specialty:
    'Angular and AWS software for federal farm-loan programs, plus deployed client software, computer vision, and risk-first systems',
  tagline:
    'I write the Angular and AWS software that 1,500 USDA Farm Service Agency staff and applicants use to process federal farm loans. Outside that, I ship client sites, real-time computer vision, and risk-first trading infrastructure.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  resumeUrl: '/Alexander-Urs-Badet-Resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/alexander-urs-badet-1a09a2220/',
    github: 'https://github.com/LilBum',
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
