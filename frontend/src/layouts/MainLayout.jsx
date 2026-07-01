import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { sessionService } from '../services/session'
import ThemeToggle from '../components/common/ThemeToggle'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h8v8H3v-8Zm10 3h8v5h-8v-5Z' },
  { to: '/notes', label: 'Notes', icon: 'M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm2 8h8v2H8v-2Zm0 4h8v2H8v-2Z' },
  { to: '/summarizer', label: 'Summarizer', icon: 'M12 2l2.09 5.26L20 8l-4 3.9L17 18l-5-2.8L7 18l1-6.1L4 8l5.91-.74L12 2Z' },
  { to: '/assistant', label: 'Assistant', icon: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Z' },
  { to: '/quiz', label: 'Quiz', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 15h-1.8v-1.8h1.8V17Zm1.4-6.1c-.4.5-1 .8-1.3 1.2-.2.3-.3.6-.3 1.1h-1.8c0-.8.2-1.4.6-1.9.3-.4.9-.8 1.2-1.1.3-.4.4-.8.2-1.3-.2-.5-.7-.7-1.2-.6-.6.1-.9.6-.9 1.2H7.9c0-1.6 1.2-2.9 2.9-2.9 1.9 0 3 .9 3.3 2.2.2.9-.1 1.7-.8 2.2Z' },
  { to: '/tasks', label: 'Tasks', icon: 'M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.4-1.4L9 16.2ZM3 5h9v2H3V5Zm0 6h6v2H3v-2Zm0 6h6v2H3v-2Z' },
  { to: '/timetable', label: 'Timetable', icon: 'M7 2v2h10V2h2v2h1a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1V2h2Zm13 7H4v11h16V9Z' },
  { to: '/rooms', label: 'Rooms', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0H4Z' },
  { to: '/resume', label: 'Resume', icon: 'M9 2h6a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1Zm1 2v1h4V4h-4Zm-2 8h8v2H8v-2Zm0 4h8v2H8v-2Z' },
  { to: '/profile', label: 'Profile', icon: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6Z' },
]

function NavIcon({ path }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d={path} />
    </svg>
  )
}

export default function MainLayout() {
  const navigate = useNavigate()
  const user = sessionService.getUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const onLogout = () => {
    sessionService.clearSession()
    navigate('/login')
  }

  const initial = (user?.name || 'S').trim().charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-brand-100/70 to-transparent dark:from-brand-950/40" />

      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow">
              S
            </span>
            <span className="text-lg font-bold tracking-tight">
              Study<span className="gradient-text">Ace</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                <NavIcon path={item.icon} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                {initial}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {user?.name || 'Student'}
              </span>
            </div>
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="btn-base hidden bg-slate-900 px-3 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:inline-flex"
            >
              Logout
            </button>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-600 lg:hidden dark:border-slate-700 dark:text-slate-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                {menuOpen ? (
                  <path d="M6.4 5L5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4L13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z" />
                ) : (
                  <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200/70 bg-white/95 px-4 py-3 lg:hidden dark:border-slate-800/70 dark:bg-slate-950/95">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <NavIcon path={item.icon} />
                  {item.label}
                </NavLink>
              ))}
            </div>
            <button
              onClick={onLogout}
              className="btn-base mt-3 w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/70 py-6 text-center text-xs text-slate-500 dark:border-slate-800/70">
        StudyAce {new Date().getFullYear()} - AI productivity for students
      </footer>
    </div>
  )
}
