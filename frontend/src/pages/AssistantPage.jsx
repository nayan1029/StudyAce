import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
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

    const conversation = [
      ...messages,
      createMessage('user', trimmedQuestion),
    ]

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

  const handleQuickPrompt = (prompt) => {
    setQuestion(prompt)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendQuestion(question)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">AI Study Assistant</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Chat naturally, ask follow-up questions, and keep the conversation focused on your study goal.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card title="Quick prompts" className="h-fit">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Start with one of these, or type your own question below.
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-left text-xs text-gray-700 dark:text-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 p-4 text-sm text-indigo-900 dark:text-indigo-100">
              <p className="font-semibold mb-1">How it works</p>
              <p>
                The assistant gives a short explanation and revision steps, so you can keep asking follow-up questions like a real tutor chat.
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
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-6">{message.content}</p>

                  {message.role === 'assistant' && message.nextSteps?.length > 0 && (
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Next steps</p>
                      <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
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
                <div className="rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Ask your next study question
            </label>
            <textarea
              className="w-full min-h-28 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a topic, concept, or revision goal. Press Enter to send, Shift+Enter for a new line."
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Keep the conversation going with follow-up questions for examples, summaries, or practice prompts.
              </p>
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
