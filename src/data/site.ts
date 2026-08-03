export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  url: 'https://alexub-portfolio.vercel.app',
  role: 'Full-Stack Software Engineer',
  specialty:
    'Production Angular/AWS applications, modern full-stack products, and deployed client software, with additional depth in computer vision and reliable systems',
  tagline:
    'I build and ship production web software across regulated loan systems, a private full-stack product, and a public client site. My work spans Angular, AWS, Next.js, reliable integrations, computer vision, and risk-first systems.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  resumeUrl: '/Alexander-Urs-Badet-Resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/alexander-urs-badet-1a09a2220/',
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
