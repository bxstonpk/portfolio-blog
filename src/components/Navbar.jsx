import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site } from '../data/site.js'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import Container from './Container.jsx'

function useLinks() {
  const { t } = useLanguage()
  return [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/contact', label: t('nav.contact') },
  ]
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        `border-b-2 px-1 py-1 text-sm font-medium transition-colors ${
          isActive
            ? 'border-violet-500 text-violet-600 dark:text-violet-400'
            : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t('common.switchLanguage')}
      className="flex overflow-hidden rounded-lg border border-slate-300 text-xs font-semibold dark:border-slate-700"
    >
      {['en', 'th'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`px-2 py-1.5 transition-colors ${
            lang === code
              ? 'bg-violet-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const links = useLinks()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('common.toggleTheme')}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 px-6 py-3 md:hidden dark:border-slate-800">
          {links.map((link) => (
            <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  )
}
