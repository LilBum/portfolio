export type SkillGroup = { label: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite'],
  },
  {
    label: 'Backend & Cloud',
    items: ['AWS Lambda', 'S3', 'API Gateway', 'Node.js', 'Java/Spring', 'Python/Flask', 'SQL'],
  },
  {
    label: 'Roblox Development',
    items: [
      'Luau',
      'Roblox Studio',
      'Rojo',
      'Wally',
      'ProfileStore',
      'DataStores',
      'Economy Systems',
      'Remote Security',
      'HUD/UI Systems',
    ],
  },
  {
    label: 'Engineering',
    items: [
      'Jest',
      'CI/CD',
      'System Migration',
      'Security Auditing',
      'Performance',
      'Telemetry',
      'Computer Vision',
      'OpenCV',
      'C#',
      'Technical Writing',
    ],
  },
]
