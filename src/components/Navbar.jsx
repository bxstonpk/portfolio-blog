import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site } from '../data/site.js'
import { useTheme } from '../context/ThemeContext.jsx'
import Container from './Container.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

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
          {LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
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
          {LINKS.map((link) => (
            <NavItem key={link.to} {...link} onClick={() => setOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  )
}
