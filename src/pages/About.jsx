import { GraduationCap, MapPin, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { site, journey, education, interests } from '../data/site.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { pick } from '../i18n/translations.js'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function About() {
  const { lang, t } = useLanguage()

  return (
    <div>
      <PageHeader title={t('about.title')} />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <aside className="space-y-5">
            <img
              src="/images/profile.jpg"
              alt={site.name}
              className="h-40 w-40 rounded-2xl object-cover shadow-lg"
            />
            <div>
              <h2 className="text-xl font-semibold">{site.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">{pick(site.role, lang)}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> {pick(site.location, lang)}
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
              {pick(site.bio, lang).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t('about.journey')}
              </h3>
              <ol className="grid gap-4 sm:grid-cols-2">
                {journey.map((step, index) => (
                  <li
                    key={index}
                    className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                      {pick(step.year, lang)}
                    </span>
                    <p className="mt-1 font-medium">{pick(step.title, lang)}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {pick(step.description, lang)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <GraduationCap size={16} /> {t('about.education')}
                </h3>
                <ul className="space-y-2 whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                  {education.map((item, index) => (
                    <li key={index}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t('about.interests')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {pick(item, lang)}
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
