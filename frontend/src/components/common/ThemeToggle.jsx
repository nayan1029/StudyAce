import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 11a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM5.64 5.64a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.41 1.42l-.71-.7a1 1 0 0 1 0-1.42Zm11.9 11.9a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.41 1.42l-.71-.7a1 1 0 0 1 0-1.42Zm1.42-11.9a1 1 0 0 1 0 1.42l-.7.7a1 1 0 1 1-1.42-1.41l.7-.71a1 1 0 0 1 1.42 0ZM7.06 17.54a1 1 0 0 1 0 1.42l-.7.7a1 1 0 0 1-1.42-1.41l.7-.71a1 1 0 0 1 1.42 0Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.75 15.5A9.25 9.25 0 0 1 8.5 2.25a.75.75 0 0 0-.98-.98A10.75 10.75 0 1 0 22.73 16.48a.75.75 0 0 0-.98-.98Z" />
        </svg>
      )}
    </button>
  )
}
