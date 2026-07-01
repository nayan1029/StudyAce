import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import PageHeader from '../components/common/PageHeader'
import { timetableApi } from '../api/timetableApi'

export default function TimetablePage() {
  const [subjects, setSubjects] = useState('Algorithms, Database Systems, Operating Systems, Placement Prep')
  const [weakSubjects, setWeakSubjects] = useState('Placement Prep')
  const [dailyHours, setDailyHours] = useState(2)
  const query = useQuery({ queryKey: ['timetable'], queryFn: timetableApi.get })
  const mutation = useMutation({ mutationFn: timetableApi.generate })

  const table = mutation.data?.schedule || query.data || []

  return (
    <div className="space-y-8">
      <PageHeader title="Smart Timetable Generator" subtitle="Build a study plan that prioritizes weak subjects." />

      <Card title="Plan Inputs">
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="space-y-1.5 lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subjects</label>
            <input
              className="field-input"
              value={subjects}
              onChange={(event) => setSubjects(event.target.value)}
              placeholder="Subjects, separated by commas"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Weak subjects</label>
            <input
              className="field-input"
              value={weakSubjects}
              onChange={(event) => setWeakSubjects(event.target.value)}
              placeholder="Weak subjects"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Daily hours</label>
            <input
              className="field-input"
              type="number"
              min="1"
              max="8"
              value={dailyHours}
              onChange={(event) => setDailyHours(event.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => mutation.mutate({ subjects, weakSubjects, dailyHours: Number(dailyHours) })}
            disabled={mutation.isPending || !subjects.trim()}
          >
            {mutation.isPending ? 'Generating...' : 'Generate Timetable'}
          </Button>
        </div>
      </Card>

      <Card title="Generated Timetable">
        {query.isLoading && !mutation.data ? (
          <Loader text="Loading timetable" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  <th className="py-2.5 pr-4 font-semibold">Day</th>
                  <th className="py-2.5 pr-4 font-semibold">Subject</th>
                  <th className="py-2.5 pr-4 font-semibold">Time</th>
                  <th className="py-2.5 font-semibold">Focus</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row, index) => (
                  <tr
                    key={`${row.day}-${row.subject}-${index}`}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-100">{row.day}</td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{row.subject}</td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{row.time || row.slot}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                        {row.focus || 'Revision'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
