import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import Container from '../components/Container.jsx'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-6xl font-bold text-violet-600 dark:text-violet-400">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{t('notFound.title')}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{t('notFound.description')}</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
      >
        {t('notFound.backHome')}
      </Link>
    </Container>
  )
}
