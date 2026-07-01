import React from 'react'

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`field-input ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : ''} ${className}`}
      />
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  )
}
