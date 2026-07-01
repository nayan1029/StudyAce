import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { aiApi } from '../api/aiApi'

const QUICK_PROMPTS = [
  'Explain photosynthesis in simple terms',
  'Make a study plan for my Java exam',
  'Give me 5 quiz questions on React hooks',
  'How do I revise effectively in 2 days?',
]

function createMessage(role, content, extra = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    ...extra,
  }
}

export default function AssistantPage() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    createMessage(
      'assistant',
      'Hi, I am your StudyAce assistant. Ask me to explain a topic, create a revision plan, or quiz you on a subject.'
    ),
  ])
  const messagesEndRef = useRef(null)
  const mutation = useMutation({ mutationFn: aiApi.askAssistant })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendQuestion = async (rawQuestion) => {
    const trimmedQuestion = rawQuestion.trim()

    if (!trimmedQuestion || mutation.isPending) {
      return
    }

    const conversation = [...messages, createMessage('user', trimmedQuestion)]

    setMessages(conversation)
    setQuestion('')

    try {
      const response = await mutation.mutateAsync({
        text: trimmedQuestion,
        history: conversation.slice(-8).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      })

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', response.answer, {
          nextSteps: response.nextSteps || [],
        }),
      ])
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'assistant',
          'I could not answer that right now. Try again in a moment or rephrase the topic.'
        ),
      ])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendQuestion(question)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendQuestion(question)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Study Assistant"
        subtitle="Chat naturally and keep the conversation focused on your study goal."
      />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card title="Quick prompts" className="h-fit">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Start with one of these, or type your own question below.
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setQuestion(prompt)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900 dark:border-brand-900/60 dark:bg-brand-950/30 dark:text-brand-100">
              <p className="mb-1 font-semibold">How it works</p>
              <p>
                The assistant gives a short explanation and revision steps, so you can keep asking
                follow-up questions like a real tutor chat.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Chat with StudyAce" className="flex h-[70vh] flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-brand-gradient text-white'
                      : 'rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-6">{message.content}</p>

                  {message.role === 'assistant' && message.nextSteps?.length > 0 && (
                    <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        Next steps
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                        {message.nextSteps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {mutation.isPending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <textarea
              className="field-input min-h-24 resize-y"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a topic or question. Press Enter to send, Shift+Enter for a new line."
            />
            <div className="mt-3 flex items-center justify-end">
              <Button type="submit" disabled={mutation.isPending || !question.trim()}>
                {mutation.isPending ? 'Thinking...' : 'Send message'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
