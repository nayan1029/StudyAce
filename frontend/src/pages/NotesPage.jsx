import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import PageHeader from '../components/common/PageHeader'
import { notesApi } from '../api/notesApi'

export default function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const notesQuery = useQuery({ queryKey: ['notes'], queryFn: notesApi.getAll })
  const createMutation = useMutation({
    mutationFn: notesApi.create,
    onSuccess: () => {
      setTitle('')
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    createMutation.mutate({ title, content })
  }

  const notes = notesQuery.data || []

  return (
    <div className="space-y-8">
      <PageHeader title="Notes" subtitle="Capture and organize what you learn." />

      <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Card title="Create Note" className="h-fit">
          <form onSubmit={onSubmit} className="space-y-3">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
              <textarea
                className="field-input min-h-32 resize-y"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Saving...' : 'Save Note'}
            </Button>
          </form>
        </Card>

        <Card title="Recent Notes" subtitle={notes.length ? `${notes.length} saved` : undefined}>
          {notesQuery.isLoading ? (
            <Loader text="Loading notes" />
          ) : notes.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No notes yet. Create your first note to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-brand-500/50"
                >
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{note.title}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
