import { Link } from 'react-router-dom'

const GRADIENTS = [
  'from-violet-500/30 via-fuchsia-500/10 to-slate-500/10',
  'from-sky-500/30 via-violet-500/10 to-slate-500/10',
  'from-emerald-500/30 via-teal-500/10 to-slate-500/10',
  'from-amber-500/30 via-rose-500/10 to-slate-500/10',
]

const CATEGORY_STYLES = {
  Technology: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  Business: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Career: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Life: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
}

function gradientFor(slug) {
  const sum = [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return GRADIENTS[sum % GRADIENTS.length]
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogCard({ post }) {
  const badgeClass =
    CATEGORY_STYLES[post.category] ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`h-36 bg-gradient-to-br ${gradientFor(post.slug)}`} />
      <div className="flex flex-1 flex-col p-5">
        <span className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>
          {post.category}
        </span>
        <h3 className="font-semibold leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  )
}
