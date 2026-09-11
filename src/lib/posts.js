import { parseFrontmatter } from './frontmatter.js'

// Every published post lives in /blogs/published as a .md file with
// frontmatter (title, date, category, tags). Work-in-progress posts belong
// in /blogs/draft — they are never imported here, so they stay off the site
// until you move them into /blogs/published.
//
// Bilingual posts: `my-post.md` is the English version, `my-post.th.md` is
// its Thai translation. Both are optional — if a translation is missing for
// the active language, the other language is shown instead.
const files = import.meta.glob('../../blogs/published/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const THAI_CHAR_RE = /[฀-๿]/

function splitFilename(path) {
  const filename = path.split('/').pop().replace(/\.md$/, '')
  if (filename.endsWith('.th')) {
    return { slug: filename.slice(0, -3), lang: 'th' }
  }
  return { slug: filename, lang: 'en' }
}

function excerptFrom(content, length = 160) {
  const text = content
    .replace(/^#{1,6}\s.*$/gm, '')
    .replace(/[#*`>_~[\]!]/g, '')
    .replace(/\(([^)]*)\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > length ? `${text.slice(0, length).trim()}…` : text
}

function readingTime(content) {
  const totalChars = content.replace(/\s+/g, '').length
  const thaiChars = (content.match(THAI_CHAR_RE) || []).length
  if (totalChars > 0 && thaiChars / totalChars > 0.3) {
    // Thai script isn't space-delimited, so word counting undercounts badly.
    // ~500 characters/minute is a common estimate for Thai reading speed.
    return Math.max(1, Math.round(totalChars / 500))
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// slug -> { en: { data, content } | undefined, th: { ... } | undefined }
const postsBySlug = {}
for (const [path, raw] of Object.entries(files)) {
  const { slug, lang } = splitFilename(path)
  const parsed = parseFrontmatter(raw)
  postsBySlug[slug] ??= {}
  postsBySlug[slug][lang] = parsed
}

function buildPost(slug, variants, lang) {
  const resolvedLang = variants[lang] ? lang : variants.en ? 'en' : 'th'
  const variant = variants[resolvedLang]
  if (!variant) return null
  const { data, content } = variant
  return {
    slug,
    lang: resolvedLang,
    title: data.title ?? slug,
    date: data.date ?? '',
    category: data.category ?? 'General',
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? excerptFrom(content),
    readingTime: readingTime(content),
    content,
  }
}

export function getPosts(lang) {
  return Object.entries(postsBySlug)
    .map(([slug, variants]) => buildPost(slug, variants, lang))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug, lang) {
  const variants = postsBySlug[slug]
  if (!variants) return null
  return buildPost(slug, variants, lang)
}

export function getPostCategories(lang) {
  return Array.from(new Set(getPosts(lang).map((post) => post.category)))
}
