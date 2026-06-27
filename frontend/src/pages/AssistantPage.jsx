import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { aiApi } from '../api/aiApi'

export default function AssistantPage() {
  const [question, setQuestion] = useState('')
  const mutation = useMutation({ mutationFn: aiApi.askAssistant })

  const askQuestion = () => {
    mutation.mutate({ text: question })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">AI Study Assistant</h1>
      <Card title="Ask a Study Question">
        <textarea
          className="w-full min-h-36 px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask for a concept explanation, study guidance, or revision strategy"
        />
        <div className="mt-3">
          <Button onClick={askQuestion} disabled={mutation.isPending || !question.trim()}>
            {mutation.isPending ? 'Thinking...' : 'Ask Assistant'}
          </Button>
        </div>
      </Card>

      {mutation.data && (
        <Card title="Assistant Response">
          <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{mutation.data.answer}</p>
          {mutation.data.nextSteps?.length > 0 && (
            <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {mutation.data.nextSteps.map((step) => <li key={step}>{step}</li>)}
            </ul>
          )}
        </Card>
      )}
    </div>
  )
}
