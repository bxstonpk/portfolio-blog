import { GraduationCap, MapPin, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { site, journey, education, interests } from '../data/site.js'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function About() {
  return (
    <div>
      <PageHeader title="About Me" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <aside className="space-y-5">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-4xl font-bold text-white">
              {site.initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{site.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">{site.role}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> {site.location}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> {site.email}
              </li>
              {site.github && (
                <li className="flex items-center gap-2">
                  <FaGithub size={16} /> GitHub
                </li>
              )}
              {site.linkedin && (
                <li className="flex items-center gap-2">
                  <FaLinkedin size={16} /> LinkedIn
                </li>
              )}
            </ul>
          </aside>

          <div className="space-y-10">
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              {site.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                My Journey
              </h3>
              <ol className="grid gap-4 sm:grid-cols-2">
                {journey.map((step) => (
                  <li
                    key={step.year}
                    className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                      {step.year}
                    </span>
                    <p className="mt-1 font-medium">{step.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <GraduationCap size={16} /> Education
                </h3>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
