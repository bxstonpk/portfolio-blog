import { groupBySlug, readingTime } from './posts.js'

// Long-form write-ups for projects live in /projects as `<slug>.md` (English)
// and `<slug>.th.md` (Thai), keyed by the `slug` in data/projects.js. Title,
// tags and cover come from data/projects.js; the markdown is just the body.
const files = import.meta.glob('../../projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const docsBySlug = groupBySlug(files)

export function hasProjectDoc(slug) {
  return Boolean(docsBySlug[slug])
}

export function getProjectDoc(slug, lang) {
  const variants = docsBySlug[slug]
  if (!variants) return null
  const resolvedLang = variants[lang] ? lang : variants.en ? 'en' : 'th'
  const { content } = variants[resolvedLang]
  return { lang: resolvedLang, content, readingTime: readingTime(content) }
}
