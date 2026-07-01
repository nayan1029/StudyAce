import React from 'react'

const variants = {
  primary:
    'btn-base bg-brand-gradient text-white shadow-glow hover:brightness-110 active:brightness-95',
  secondary:
    'btn-base border border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500',
  ghost:
    'btn-base text-slate-600 hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800',
  danger:
    'btn-base bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800',
}

export default function Button({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
