import React from 'react'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500/30 border-t-brand-600" />
      <span>{text}</span>
    </div>
  )
}
