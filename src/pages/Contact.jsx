import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { site } from '../data/site.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { pick } from '../i18n/translations.js'
import Container from '../components/Container.jsx'
import PageHeader from '../components/PageHeader.jsx'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { lang, t } = useLanguage()
  const [form, setForm] = useState(initialForm)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  // GitHub Pages is static hosting with no backend, so submitting opens the
  // visitor's email client with the message prefilled. Swap this for a
  // service like Formspree or EmailJS if you'd rather receive it directly.
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      form.subject || `Message from ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <div>
      <PageHeader title={t('contact.title')} description={t('contact.description')} />
      <Container className="grid gap-10 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <Mail className="text-violet-600 dark:text-violet-400" size={20} />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('contact.email')}</p>
              <p className="font-medium">{site.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <MapPin className="text-violet-600 dark:text-violet-400" size={20} />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('contact.location')}</p>
              <p className="font-medium">{pick(site.location, lang)}</p>
            </div>
          </div>
          {site.github && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <FaGithub className="text-violet-600 dark:text-violet-400" size={20} />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                <a href={site.github} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                  {site.github.replace('https://', '')}
                </a>
              </div>
            </div>
          )}
          {site.linkedin && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <FaLinkedin className="text-violet-600 dark:text-violet-400" size={20} />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                  {site.linkedin.replace('https://www.', '')}
                </a>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <input
            type="text"
            required
            placeholder={t('contact.namePlaceholder')}
            value={form.name}
            onChange={update('name')}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700"
          />
          <input
            type="email"
            required
            placeholder={t('contact.emailPlaceholder')}
            value={form.email}
            onChange={update('email')}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700"
          />
          <input
            type="text"
            placeholder={t('contact.subjectPlaceholder')}
            value={form.subject}
            onChange={update('subject')}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700"
          />
          <textarea
            required
            rows={5}
            placeholder={t('contact.messagePlaceholder')}
            value={form.message}
            onChange={update('message')}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500 dark:border-slate-700"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            {t('contact.send')}
          </button>
        </form>
      </Container>
    </div>
  )
}
