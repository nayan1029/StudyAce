import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { authApi } from '../api/authApi'
import { sessionService } from '../services/session'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await authApi.login(form)
      sessionService.saveSession(data.user, data.token)
      navigate('/dashboard')
    } catch (err) {
      const errorData = err.response?.data
      if (errorData?.errors) {
        const fieldErrors = Object.entries(errorData.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(' | ')
        setError(fieldErrors)
      } else {
        setError(errorData?.message || 'Login failed')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid-cols-2">
      {/* Visual panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="/login-hero.jpg"
          alt="Student learning with StudyAce"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-700/80 via-brand-600/50 to-fuchsia-600/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold backdrop-blur">
              S
            </span>
            <span className="text-xl font-bold tracking-tight">StudyAce</span>
          </Link>
          <div>
            <h2 className="max-w-md text-3xl font-bold leading-tight">
              Study smarter, not harder.
            </h2>
            <p className="mt-3 max-w-sm text-white/80">
              Notes, quizzes, timetables, and an AI tutor — all in one place, built for students.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <form onSubmit={onSubmit} className="w-full max-w-md animate-fade-up space-y-5">
          <div className="text-center lg:text-left">
            <Link
              to="/"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-lg font-bold text-white shadow-glow lg:hidden"
            >
              S
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 lg:mt-0 dark:text-slate-100">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Sign in to continue to StudyAce
            </p>
          </div>

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@college.edu"
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            No account?{' '}
            <Link className="font-semibold text-brand-600 hover:text-brand-700" to="/register">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
