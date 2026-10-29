import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { projects } from '../data/projects.js'
import { getProjectDoc } from '../lib/projectDocs.js'
import { extractHeadings, scrollToHeading } from '../lib/toc.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { pick } from '../i18n/translations.js'
import Container from '../components/Container.jsx'
import Markdown, { assetUrl } from '../components/Markdown.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)
  const doc = project ? getProjectDoc(slug, lang) : null
  const headings = useMemo(() => (doc ? extractHeadings(doc.content) : []), [doc])

  if (!project || !doc) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div>
      <Container className="py-10">
        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
        >
          <ArrowLeft size={16} /> {t('projectDetail.back')}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            {pick(project.description, lang)}
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {project.period && <>{pick(project.period, lang)} · </>}
            {doc.readingTime} {t('blog.minRead')}
          </p>
        </div>

        {project.cover && (
          <img
            src={assetUrl(project.cover)}
            alt={project.title}
            className="mx-auto mb-10 w-full max-w-4xl rounded-xl border border-slate-200 dark:border-slate-800"
          />
        )}

        {doc.lang !== lang && (
          <p className="mb-6 rounded-lg bg-amber-100 px-4 py-2 text-sm text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
            {t('projectDetail.otherLanguage')}
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <Markdown>{doc.content}</Markdown>

          <aside className="order-first space-y-8 lg:order-last">
            {headings.length > 0 && (
              <div className="lg:sticky lg:top-24">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t('projectDetail.toc')}
                </h2>
                <ul className="space-y-2 text-sm">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.depth === 3 ? 'pl-3' : ''}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(event) => scrollToHeading(event, heading.id)}
                        className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t('projectDetail.stack')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  )
}
