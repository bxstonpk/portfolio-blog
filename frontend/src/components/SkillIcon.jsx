import {
  SiCss,
  SiDocker,
  SiFigma,
  SiGit,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { Webhook, Workflow } from 'lucide-react'

const ICONS = {
  go: SiGo,
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  sql: SiMysql,
  react: SiReact,
  tailwind: SiTailwindcss,
  html5: SiHtml5,
  css3: SiCss,
  vite: SiVite,
  nodejs: SiNodedotjs,
  restapi: Webhook,
  graphql: SiGraphql,
  git: SiGit,
  docker: SiDocker,
  cicd: Workflow,
  mysql: SiMysql,
  figma: SiFigma,
}

export default function SkillIcon({ icon, className = '' }) {
  const Icon = ICONS[icon] ?? Webhook
  return <Icon className={className} />
}
