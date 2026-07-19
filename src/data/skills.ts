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
    label: 'Testing & delivery',
    items: [
      'Jest',
      'Unit Testing',
      'CI/CD',
      'Git',
      'Agile/Scrum',
      'Legacy Migration',
      'Code Review',
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
    label: 'Reverse engineering & security',
    items: [
      'Reverse Engineering',
      'Protobuf',
      'Network Protocols',
      'Anti-exploit',
      'Security Audits',
      'Luau / Roblox',
    ],
  },
];
