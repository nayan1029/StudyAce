import React from 'react'
import Card from '../components/common/Card'
import PageHeader from '../components/common/PageHeader'
import { sessionService } from '../services/session'

export default function ProfilePage() {
  const user = sessionService.getUser()
  const name = user?.name || 'Student User'
  const email = user?.email || 'student@studyace.app'
  const role = user?.role || 'STUDENT'
  const initial = name.trim().charAt(0).toUpperCase()

  const rows = [
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    { label: 'Role', value: role },
  ]

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" subtitle="Your StudyAce account details." />

      <Card>
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-2xl font-bold text-white shadow-glow">
            {initial}
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{email}</p>
          </div>
        </div>

        <dl className="mt-5 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <dt className="text-slate-500 dark:text-slate-400">{row.label}</dt>
              <dd className="font-medium text-slate-900 dark:text-slate-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}
