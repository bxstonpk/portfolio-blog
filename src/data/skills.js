// Edit this list to reflect your own stack. `icon` keys map to
// components/SkillIcon.jsx. `titleKey` maps to skills.groups.* in
// src/i18n/translations.js — skill names themselves (React, Docker, ...)
// are technical terms and stay the same in both languages.
export const skillGroups = [
  {
    titleKey: 'skills.groups.languages',
    skills: [
      { name: 'Go', icon: 'go' },
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'SQL', icon: 'sql' },
    ],
  },
  {
    titleKey: 'skills.groups.frontend',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    titleKey: 'skills.groups.backend',
    skills: [
      { name: 'Go', icon: 'go' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'REST API', icon: 'restapi' },
      { name: 'GraphQL', icon: 'graphql' },
    ],
  },
  {
    titleKey: 'skills.groups.tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'CI/CD', icon: 'cicd' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Figma', icon: 'figma' },
    ],
  },
]
