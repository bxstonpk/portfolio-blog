import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// Relative image paths in markdown (e.g. `images/projects/x.webp`) point into
// /public, so they're resolved against BASE_URL like the rest of the site.
export function assetUrl(src) {
  if (!src || /^([a-z]+:|\/|#)/i.test(src)) return src
  return `${import.meta.env.BASE_URL}${src}`
}

// An image's alt text doubles as its caption. Images open full size in a new
// tab, since screenshots are hard to read at article width.
function Figure({ src, alt }) {
  const url = assetUrl(src)
  return (
    <span className="my-8 block">
      <a href={url} target="_blank" rel="noreferrer" className="block">
        <img
          src={url}
          alt={alt}
          loading="lazy"
          className="my-0 w-full rounded-lg border border-slate-200 dark:border-slate-800"
        />
      </a>
      {alt && (
        <span className="mt-2 block text-center text-sm text-slate-500 dark:text-slate-400">
          {alt}
        </span>
      )}
    </span>
  )
}

export default function Markdown({ children }) {
  return (
    <article className="prose prose-slate min-w-0 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-violet-600 dark:prose-a:text-violet-400">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{ img: Figure }}
      >
        {children}
      </ReactMarkdown>
    </article>
  )
}
