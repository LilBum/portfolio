export type SkillGroup = { label: string; items: string[] }

export const languages = ['Python', 'TypeScript', 'JavaScript', 'Java', 'C#', 'SQL', 'Luau']

export const projectLanguages = ['Arduino C++ for microcontrollers', 'PowerShell for installation scripts']

export const researchSkills = [
  {
    label: 'Machine learning & computer vision',
    description: 'I train pose estimation models with DeepLabCut and PyTorch. I use OpenCV to process images and NumPy to work with arrays.',
    note: 'I’m also familiar with scikit-learn and TensorFlow.',
  },
  {
    label: 'Lab software & robotics',
    description: 'I build visual workflows in Bonsai, use ANY-maze for behavioral tracking, and build desktop interfaces with PySide6 (Qt). My robotics work includes live tracking and closed-loop control.',
  },
]

export const skillGroups: SkillGroup[] = [
  { label: 'Web interfaces', items: ['Angular', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'Services & APIs', items: ['Node.js', 'Spring Boot', 'Django', 'FastAPI', 'REST APIs', 'OAuth 2.0'] },
  { label: 'Cloud & data', items: ['AWS Lambda', 'API Gateway', 'S3', 'Cloudflare Workers', 'PostgreSQL', 'SQLite'] },
  { label: 'Testing & delivery', items: ['Jest', 'pytest', 'Unit testing', 'Git', 'CI/CD', 'Code review', 'Legacy migration'] },
]
