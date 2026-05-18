import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../features/ui/uiSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="text-xs px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
    >
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}
