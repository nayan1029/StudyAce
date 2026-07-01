import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { authApi } from '../api/authApi'
import { sessionService } from '../services/session'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await authApi.register(form)
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
        setError(errorData?.message || 'Registration failed')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-600/20" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-700/20" />
      </div>

      <form
        onSubmit={onSubmit}
        className="card-surface w-full max-w-md animate-fade-up space-y-5 p-8"
      >
        <div className="text-center">
          <Link
            to="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-lg font-bold text-white shadow-glow"
          >
            S
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Start studying smarter with StudyAce
          </p>
        </div>

        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Alex Student"
          required
        />
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
          placeholder="At least 6 characters"
          minLength={6}
          required
        />

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Register'}
        </Button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link className="font-semibold text-brand-600 hover:text-brand-700" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
