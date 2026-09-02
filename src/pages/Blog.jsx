import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { posts, getPostCategories } from '../lib/posts.js'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'
import BlogCard from '../components/BlogCard.jsx'

export default function Blog() {
  const categories = useMemo(getPostCategories, [])
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = posts.filter((post) => {
    const matchesCategory = active === 'All' || post.category === active
    const q = query.trim().toLowerCase()
    const matchesQuery =
      q === '' ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Thoughts on technology, business, and everything I learn along the way."
      />
      <Container className="py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === category
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-violet-500 sm:w-64 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-slate-500 dark:text-slate-400">
            No posts match your search.
          </p>
        )}
      </Container>
    </div>
  )
}
