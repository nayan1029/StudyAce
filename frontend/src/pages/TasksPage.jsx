import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { tasksApi } from '../api/tasksApi'
import { CheckSquare, Plus, Check, Clock, AlertCircle, Circle } from 'lucide-react'

function priorityColor(deadline) {
  if (!deadline) return { badge: 'bg-gray-100 text-gray-500', icon: Circle }
  const diff = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  if (diff < 1)  return { badge: 'bg-red-100 text-red-700', icon: AlertCircle }
  if (diff < 3)  return { badge: 'bg-amber-100 text-amber-700', icon: Clock }
  return { badge: 'bg-emerald-100 text-emerald-700', icon: Check }
}

export default function TasksPage() {
  const [title, setTitle]       = useState('')
  const [deadline, setDeadline] = useState('')
  const [showForm, setShowForm]  = useState(false)
  const [done, setDone]          = useState(new Set())
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['tasks'], queryFn: tasksApi.getAll })
  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      setTitle('')
      setDeadline('')
      setShowForm(false)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const tasks = query.data || []
  const pending  = tasks.filter((t) => !done.has(t.id))
  const completed = tasks.filter((t) => done.has(t.id))

  const toggleDone = (id) =>
    setDone((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="text-emerald-600" size={28} />
          <div>
            <h1 className="text-3xl font-bold text-black">Task Manager</h1>
            <p className="text-gray-500 text-sm">Stay on top of deadlines</p>
          </div>
        </div>
        <Button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4">
        {[
          { label: 'Total',     value: tasks.length,     color: 'text-gray-700',    bg: 'bg-gray-50 border-gray-200' },
          { label: 'Pending',   value: pending.length,   color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200' },
          { label: 'Completed', value: completed.length, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`flex-1 rounded-xl border px-4 py-3 ${bg}`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showForm && (
        <Card title="New Task">
          <div className="grid md:grid-cols-3 gap-3">
            <Input label="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input label="Deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            <div className="flex items-end gap-2">
              <Button
                className="flex-1"
                onClick={() => createMutation.mutate({ title, deadline })}
                disabled={!title || createMutation.isPending}
              >
                {createMutation.isPending ? 'Adding…' : 'Add'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pending Tasks */}
      <Card title={`📋 Pending (${pending.length})`}>
        {pending.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">All caught up! 🎉</p>
        ) : (
          <ul className="space-y-2">
            {pending.map((task) => {
              const { badge, icon: Icon } = priorityColor(task.deadline)
              return (
                <li
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-colors group"
                >
                  <button
                    onClick={() => toggleDone(task.id)}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-teal-400 flex-shrink-0 flex items-center justify-center transition-colors"
                  />
                  <span className="flex-1 text-sm font-medium text-black">{task.title}</span>
                  {task.deadline && (
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${badge}`}>
                      <Icon size={11} />
                      {new Date(task.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      {/* Completed */}
      {completed.length > 0 && (
        <Card title={`✅ Completed (${completed.length})`}>
          <ul className="space-y-2">
            {completed.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50"
              >
                <button
                  onClick={() => toggleDone(task.id)}
                  className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center"
                >
                  <Check size={13} className="text-white" />
                </button>
                <span className="flex-1 text-sm text-gray-500 line-through">{task.title}</span>
                {task.deadline && (
                  <span className="text-xs text-gray-400">
                    {new Date(task.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
