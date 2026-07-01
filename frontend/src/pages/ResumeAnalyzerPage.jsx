import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { aiApi } from '../api/aiApi'

function scoreColor(score) {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
  if (score >= 65) return 'text-amber-600 dark:text-amber-400'
  return 'text-rose-600 dark:text-rose-400'
}

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('')
  const mutation = useMutation({ mutationFn: aiApi.analyzeResume })
  const result = mutation.data

  return (
    <div className="space-y-8">
      <PageHeader title="Resume Assistant" subtitle="Get an ATS score and improvement tips." />

      <Card title="Paste Resume Content">
        <textarea
          className="field-input min-h-48 resize-y"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume text for analysis"
        />
        <div className="mt-4">
          <Button onClick={() => mutation.mutate({ text: resumeText })} disabled={mutation.isPending || !resumeText.trim()}>
            {mutation.isPending ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>
      </Card>

      {result && (
        <Card title="Analysis Results">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className={`text-2xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">ATS Score</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Apply the suggestions below to improve your score.
              </p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {suggestion}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
