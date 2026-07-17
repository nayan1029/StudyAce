import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={16} />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun size={16} />
          <span>Light Mode</span>
        </>
      )}
    </button>
  )
}
