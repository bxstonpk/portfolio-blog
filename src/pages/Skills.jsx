import { skillGroups } from '../data/skills.js'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SkillIcon from '../components/SkillIcon.jsx'

export default function Skills() {
  return (
    <div>
      <PageHeader
        title="Skills & Tools"
        description="Technologies and tools I use to build and solve problems."
      />
      <Container className="space-y-10 py-14">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {group.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <SkillIcon icon={skill.icon} className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </div>
  )
}
