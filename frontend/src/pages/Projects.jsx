import { useMemo, useState } from 'react'
import { projects, getProjectCategories, getProjectCategoryLabel } from '../data/projects.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  const { lang, t } = useLanguage()
  const categories = useMemo(getProjectCategories, [])
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))

  return (
    <div>
      <PageHeader title={t('projects.title')} description={t('projects.description')} />
      <Container className="py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive('All')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === 'All'
                ? 'bg-violet-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t('projects.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === category
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {getProjectCategoryLabel(category, lang)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </div>
  )
}
