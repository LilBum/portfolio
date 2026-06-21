export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend & web',
    items: [
      'Angular',
      'React',
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
      'Flask',
      'REST APIs',
      'SQL',
      'AWS',
      'Lambda',
      'S3',
      'API Gateway',
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
      'LLM Integration',
      'RAG Systems',
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
    label: 'Game systems & security',
    items: [
      'Luau',
      'Roblox Systems',
      'Remote Security',
      'Anti-exploit',
      'Economy Systems',
      'Security Audits',
    ],
  },
];
