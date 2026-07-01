import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
      <p className="text-7xl font-extrabold gradient-text">404</p>
      <h1 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The page you are looking for doesn't exist or has moved.
      </p>
      <Link
        to="/dashboard"
        className="btn-base mt-6 bg-brand-gradient px-5 py-2.5 text-white shadow-glow hover:brightness-110"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
