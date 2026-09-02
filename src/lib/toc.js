import GithubSlugger from 'github-slugger'

const HEADING_RE = /^(#{2,3})\s+(.*)$/gm

// Extracts h2/h3 headings for a table of contents, using the same slugger
// rehype-slug uses so the generated ids line up with the rendered markdown.
export function extractHeadings(content) {
  const slugger = new GithubSlugger()
  const headings = []
  let match

  while ((match = HEADING_RE.exec(content)) !== null) {
    const depth = match[1].length
    const text = match[2].trim()
    headings.push({ depth, text, id: slugger.slug(text) })
  }

  return headings
}
