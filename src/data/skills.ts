export type SkillGroup = { label: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    label: 'Backend & Cloud',
    items: ['Python', 'Java', 'C#', 'Node.js', 'AWS Lambda', 'S3', 'API Gateway', 'Flask', 'SQL'],
  },
  {
    label: 'Frontend & Web',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'Computer Vision & Robotics',
    items: ['OpenCV', 'Kalman Filtering', 'Real-Time Tracking', 'Object Detection', 'Serial / Hardware Control'],
  },
  {
    label: 'ML & Data',
    items: ['NumPy', 'pandas', 'scikit-learn', 'PyTorch', 'TensorFlow', 'DeepLabCut'],
  },
  {
    label: 'AI Tooling',
    items: ['Claude API', 'OpenAI', 'Prompt Engineering', 'LLM Integration'],
  },
  {
    label: 'Engineering & Game Systems',
    items: ['Jest', 'CI/CD', 'Security Auditing', 'Luau', 'Anti-Exploit', 'Economy Systems'],
  },
]
