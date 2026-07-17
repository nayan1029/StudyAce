import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { notesApi } from '../api/notesApi'
import { BookOpen, Plus, Search, FileText, X } from 'lucide-react'

const NOTE_COLORS = [
  'border-l-teal-500',
  'border-l-purple-500',
  'border-l-amber-500',
  'border-l-red-500',
  'border-l-blue-500',
  'border-l-emerald-500',
]

export default function NotesPage() {
  const [title, setTitle]     = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const notesQuery = useQuery({ queryKey: ['notes'], queryFn: notesApi.getAll })
  const createMutation = useMutation({
    mutationFn: notesApi.create,
    onSuccess: () => {
      setTitle('')
      setContent('')
      setShowForm(false)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    createMutation.mutate({ title, content })
  }

  const notes = (notesQuery.data || []).filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600" size={28} />
          <div>
            <h1 className="text-3xl font-bold text-black">Notes</h1>
            <p className="text-gray-500 text-sm">Capture and organise your thoughts</p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'New Note'}
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card title="Create Note">
          <form onSubmit={onSubmit} className="space-y-3">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-black">Content</label>
              <textarea
                className="w-full min-h-32 px-3 py-2 rounded-lg border border-teal-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes here…"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Saving…' : 'Save Note'}
              </Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-teal-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder="Search notes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      {notesQuery.isLoading ? (
        <Loader text="Loading notes" />
      ) : notes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">{search ? 'No notes match your search.' : 'No notes yet. Create your first one!'}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, i) => (
            <div
              key={note.id}
              className={`bg-white rounded-xl border border-gray-100 border-l-4 ${NOTE_COLORS[i % NOTE_COLORS.length]} shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-2`}
            >
              <p className="font-semibold text-black line-clamp-1">{note.title}</p>
              <p className="text-sm text-gray-600 line-clamp-4 flex-1">{note.content}</p>
              {note.createdAt && (
                <p className="text-xs text-gray-400 pt-1 border-t border-gray-100">
                  {new Date(note.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
