import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import PageHeader from '../components/common/PageHeader'
import { tasksApi } from '../api/tasksApi'

export default function TasksPage() {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['tasks'], queryFn: tasksApi.getAll })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tasks'] })

  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      setTitle('')
      setDeadline('')
      invalidate()
    },
  })
  const toggleMutation = useMutation({ mutationFn: tasksApi.toggle, onSuccess: invalidate })

  const tasks = query.data || []
  const pending = tasks.filter((task) => !task.completed)
  const done = tasks.filter((task) => task.completed)

  const renderTask = (task) => (
    <li
      key={task.id}
      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-brand-300 dark:border-slate-700 dark:hover:border-brand-500/50"
    >
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleMutation.mutate(task.id)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
        />
        <span
          className={`text-sm ${task.completed ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}
        >
          {task.title}
        </span>
      </label>
      {task.deadline && (
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {task.deadline}
        </span>
      )}
    </li>
  )

  return (
    <div className="space-y-8">
      <PageHeader title="Assignment & Task Manager" subtitle="Plan deadlines and track what's done." />

      <Card title="Add Task">
        <div className="grid gap-3 md:grid-cols-3">
          <Input label="Task" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => createMutation.mutate({ title, deadline: deadline || null })}
              disabled={!title || createMutation.isPending}
            >
              {createMutation.isPending ? 'Adding...' : 'Add Task'}
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Your Tasks" subtitle={tasks.length ? `${done.length} of ${tasks.length} completed` : undefined}>
        {query.isLoading ? (
          <Loader text="Loading tasks" />
        ) : tasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No tasks yet. Add one above to get started.
          </p>
        ) : (
          <div className="space-y-5">
            {pending.length > 0 && <ul className="space-y-2">{pending.map(renderTask)}</ul>}
            {done.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Completed</p>
                <ul className="space-y-2">{done.map(renderTask)}</ul>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
