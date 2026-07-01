import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { aiApi } from '../api/aiApi'

export default function SummarizerPage() {
  const [text, setText] = useState('')

  const mutation = useMutation({ mutationFn: aiApi.summarize })

  return (
    <div className="space-y-8">
      <PageHeader title="AI Notes Summarizer" subtitle="Paste long notes and get a focused summary." />

      <Card title="Paste Notes">
        <textarea
          className="field-input min-h-40 resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste long notes to summarize"
        />
        <div className="mt-4">
          <Button onClick={() => mutation.mutate({ text })} disabled={mutation.isPending || !text.trim()}>
            {mutation.isPending ? 'Summarizing...' : 'Generate Summary'}
          </Button>
        </div>
      </Card>

      {mutation.data && (
        <Card title="Summary">
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">
            {mutation.data.summary}
          </p>
          {mutation.data.keyPoints?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Key points
              </p>
              <ul className="space-y-2">
                {mutation.data.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
