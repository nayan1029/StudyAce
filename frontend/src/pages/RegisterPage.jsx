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
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-800 space-y-4">
        <h1 className="text-xl font-semibold">Create Account</h1>
        <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Register'}</Button>
        <p className="text-sm text-gray-600 dark:text-gray-300">Already have account? <Link className="text-indigo-600" to="/login">Sign in</Link></p>
      </form>
    </div>
  )
}
