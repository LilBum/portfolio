export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend & web',
    items: [
      'Angular',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Vite',
    ],
  },
  {
    label: 'Backend & cloud',
    items: [
      'Node.js',
      'Python',
      'Java',
      'Spring Boot',
      'C#',
      'FastAPI',
      'REST APIs',
      'WebSockets',
      'SQL',
      'PostgreSQL',
      'AWS',
      'Lambda',
      'S3',
    ],
  },
  {
    label: 'AI-assisted engineering & delivery',
    items: [
      'Claude Code',
      'OpenAI Codex',
      'Git',
      'Code Review',
      'CI/CD',
      'Jest',
      'Unit Testing',
      'Agile/Scrum',
      'Legacy Migration',
    ],
  },
  {
    label: 'AI / ML / data',
    items: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'DeepLabCut',
      'NumPy',
      'pandas',
    ],
  },
  {
    label: 'Computer vision & robotics',
    items: [
      'OpenCV',
      'Kalman Filtering',
      'Real-time Tracking',
      'Object Detection',
      'Pose Estimation',
      'Serial / Hardware Control',
    ],
  },
  {
    label: 'Security & systems',
    items: [
      'Application Security',
      'Security Audits',
      'Static Analysis',
      'OAuth / PKCE',
      'Session Security',
      'Network Protocols',
    ],
  },
];
