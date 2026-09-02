import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-slate-500/10" />
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.blogSlug ? (
        <Link
          to={`/blog/${project.blogSlug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:gap-2 dark:text-violet-400"
        >
          View Project <ArrowRight size={16} />
        </Link>
      ) : (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:gap-2 dark:text-violet-400"
        >
          View Project <ArrowRight size={16} />
        </a>
      )}
    </div>
  )
}
