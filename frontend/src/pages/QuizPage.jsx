import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { quizApi } from '../api/quizApi'

export default function QuizPage() {
  const [topic, setTopic] = useState('Data Structures')
  const [difficulty, setDifficulty] = useState('medium')

  const mutation = useMutation({ mutationFn: quizApi.generate })

  return (
    <div className="space-y-8">
      <PageHeader title="AI Quiz Generator" subtitle="Generate practice questions on any topic." />

      <Card title="Generate Quiz">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label>
            <input className="field-input" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
            <select className="field-input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => mutation.mutate({ topic, difficulty })}
              disabled={mutation.isPending || !topic.trim()}
            >
              {mutation.isPending ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
      </Card>

      {mutation.data?.questions && (
        <Card title="Generated Questions">
          <ol className="space-y-4">
            {mutation.data.questions.map((question, index) => (
              <li
                key={question.question || index}
                className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              >
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {question.question || question}
                  </p>
                </div>
                {question.options?.length > 0 && (
                  <ul className="mt-3 grid gap-2 pl-10 sm:grid-cols-2">
                    {question.options.map((option) => (
                      <li
                        key={option}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                {question.answer && (
                  <p className="mt-3 pl-10 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Answer: {question.answer}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  )
}
