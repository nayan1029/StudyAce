import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Loader from '../components/common/Loader'
import { dashboardApi } from '../api/dashboardApi'

const STAT_META = {
  completedTasks: { label: 'Completed Tasks', icon: 'M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.4-1.4L9 16.2Z', color: 'from-emerald-500 to-teal-500' },
  notesCount: { label: 'Notes Saved', icon: 'M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', color: 'from-brand-500 to-violet-500' },
  quizAttempts: { label: 'Quiz Attempts', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 15h-1.8v-1.8h1.8V17Z', color: 'from-amber-500 to-orange-500' },
  focusHours: { label: 'Focus Hours', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5h-2v6l5 3 1-1.7-4-2.3V7Z', color: 'from-fuchsia-500 to-pink-500' },
}

const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatLabel(key) {
  return STAT_META[key]?.label || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: dashboardApi.fetchDashboard })

  if (isLoading) return <Loader text="Loading dashboard" />

  const stats = data?.stats || {
    completedTasks: 12,
    notesCount: 18,
    quizAttempts: 9,
    focusHours: 26,
  }

  const productivity = [40, 65, 45, 80, 70, 90, 60]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Smart Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track your study progress at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => {
          const meta = STAT_META[key] || { icon: STAT_META.notesCount.icon, color: 'from-slate-500 to-slate-600' }
          return (
            <Card key={key} className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white shadow-md`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d={meta.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formatLabel(key)}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <Card title="Weekly Productivity" subtitle="Study activity over the last 7 days">
        <div className="flex h-48 items-end gap-3 pt-2">
          {productivity.map((height, index) => (
            <div key={WEEK[index]} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end rounded-lg bg-slate-100 dark:bg-slate-800">
                <div
                  className="w-full rounded-lg bg-brand-gradient transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{WEEK[index]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
