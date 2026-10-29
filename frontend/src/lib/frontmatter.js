import { load } from 'js-yaml'

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

// Splits a raw markdown file into its YAML frontmatter (`data`) and the
// remaining markdown body (`content`).
export function parseFrontmatter(raw) {
  const match = FRONTMATTER_RE.exec(raw)
  if (!match) return { data: {}, content: raw }
  const data = load(match[1]) || {}
  return { data, content: match[2] }
}
