export const site = {
  name: 'Alexander Urs-Badet',
  shortName: 'Alex',
  url: 'https://alexanderursbadet.com',
  role: 'Full-Stack Software Engineer',
  specialty:
    'Production Angular/AWS web applications, with additional depth in computer vision, robotics, automation, and secure game systems',
  tagline:
    'I build production web applications, backend systems, and AI-adjacent tools for real users. My professional work focuses on Angular/AWS systems in federally regulated environments, with additional project experience in computer vision, robotics, automation, and secure game architecture.',
  email: 'alexanderursbadet@gmail.com',
  location: 'Lynnwood, WA / Remote',
  resumeUrl: '/Alexander-Urs-Badet-Resume.pdf',
  socials: {
    github: 'https://github.com/LilBum',
    linkedin: 'https://www.linkedin.com/in/alex-urs-badet-1a09a2220/',
    roblox: 'https://www.roblox.com/users/857636663/profile',
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
