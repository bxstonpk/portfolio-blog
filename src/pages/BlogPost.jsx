import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { ArrowLeft, Check, Link2 } from 'lucide-react'
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { getPostBySlug } from '../lib/posts.js'
import { extractHeadings } from '../lib/toc.js'
import Container from '../components/Container.jsx'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post])
  const [copied, setCopied] = useState(false)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — nothing to fall back to safely.
    }
  }

  return (
    <div>
      <Container className="py-10">
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="mb-8 h-56 rounded-xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-slate-500/10" />

        <div className="mb-8">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-violet-600 dark:prose-a:text-violet-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {post.content}
            </ReactMarkdown>
          </article>

          <aside className="order-first space-y-8 lg:order-last">
            {headings.length > 0 && (
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Table of Contents
                </h2>
                <ul className="space-y-2 text-sm">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.depth === 3 ? 'pl-3' : ''}>
                      <a
                        href={`#${heading.id}`}
                        className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.tags.length > 0 && (
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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

            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Share this post
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <FaXTwitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <FaFacebook size={16} />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {copied ? <Check size={16} /> : <Link2 size={16} />}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}
