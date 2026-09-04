import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Code2, LineChart, Workflow } from 'lucide-react'
import { site, whatIDo } from '../data/site.js'
import { projects } from '../data/projects.js'
import { posts } from '../lib/posts.js'
import Container from '../components/Container.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import BlogCard from '../components/BlogCard.jsx'

const ICONS = { business: BarChart3, code: Code2, data: LineChart, process: Workflow }

export default function Home() {
  const latestPosts = posts.slice(0, 3)
  const featuredProjects = projects.slice(0, 2)

  return (
    <div>
      <section className="border-b border-slate-200 py-12 dark:border-slate-800">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-lg text-slate-600 dark:text-slate-400">Hi, I&apos;m</p>
            <h1 className="mt-1 text-4xl font-bold text-violet-600 sm:text-5xl dark:text-violet-400">
              {site.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-700 dark:text-slate-300">{site.role}</p>
            <p className="mt-4 max-w-lg text-slate-600 dark:text-slate-400">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
              >
                View My Work
              </Link>
              <Link
                to="/blog"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Read My Blog
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-5xl font-bold text-white sm:h-56 sm:w-56">
              {site.initials}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            What I Do
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatIDo.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {featuredProjects.length > 0 && (
        <section className="border-t border-slate-200 py-16 dark:border-slate-800">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:gap-2 dark:text-violet-400"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="border-t border-slate-200 py-16 dark:border-slate-800">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Latest from the Blog</h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:gap-2 dark:text-violet-400"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
