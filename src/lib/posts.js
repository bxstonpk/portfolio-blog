import { parseFrontmatter } from './frontmatter.js'

// Every published post lives in /blogs/published as a .md file with
// frontmatter (title, date, category, tags). Work-in-progress posts belong
// in /blogs/draft — they are never imported here, so they stay off the site
// until you move them into /blogs/published.
const files = import.meta.glob('../../blogs/published/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function slugify(path) {
  return path.split('/').pop().replace(/\.md$/, '')
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
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = slugify(path)
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      category: data.category ?? 'General',
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? excerptFrom(content),
      readingTime: readingTime(content),
      content,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}

export function getPostCategories() {
  return ['All', ...Array.from(new Set(posts.map((post) => post.category)))]
}
