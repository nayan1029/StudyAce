import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import FlashCard from '../components/common/FlashCard'
import Button from '../components/common/Button'
import { quizApi } from '../api/quizApi'
import { BrainCircuit, ChevronLeft, ChevronRight, RefreshCcw, CheckCircle } from 'lucide-react'

const DIFFICULTIES = ['easy', 'medium', 'hard']
const DIFF_COLORS = {
  easy: 'bg-emerald-500 text-white',
  medium: 'bg-amber-500 text-white',
  hard: 'bg-red-700 text-white',
}

export default function QuizPage() {
  const [topic, setTopic] = useState('Data Structures')
  const [difficulty, setDifficulty] = useState('medium')
  const [mode, setMode] = useState('list') // 'list' | 'flashcard'
  const [cardIdx, setCardIdx] = useState(0)
  const [answered, setAnswered] = useState(new Set())

  const mutation = useMutation({ mutationFn: quizApi.generate })

  const questions = mutation.data?.questions || []

  const handleGenerate = () => {
    setMode('list')
    setCardIdx(0)
    setAnswered(new Set())
    mutation.mutate({ topic, difficulty })
  }

  const markAnswered = (i) => setAnswered((prev) => new Set([...prev, i]))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BrainCircuit className="text-purple-600" size={28} />
        <h1 className="text-3xl font-bold text-black">AI Quiz Generator</h1>
      </div>

      {/* Controls */}
      <Card title="Generate Quiz">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-black">Topic</label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-teal-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Data Structures"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-black">Difficulty</label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize border transition-colors ${
                    difficulty === d
                      ? DIFF_COLORS[d]
                      : 'border-gray-200 text-gray-500 hover:border-teal-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Generating…' : '⚡ Generate Quiz'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {questions.length > 0 && (
        <>
          {/* Mode Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">View as:</span>
            <div className="flex rounded-xl overflow-hidden border border-teal-200">
              <button
                onClick={() => setMode('list')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${mode === 'list' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50'}`}
              >
                List
              </button>
              <button
                onClick={() => setMode('flashcard')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${mode === 'flashcard' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50'}`}
              >
                Flash Cards
              </button>
            </div>
            <span className="text-sm text-gray-400 ml-auto">
              {answered.size}/{questions.length} answered
            </span>
          </div>

          {/* Flashcard Mode */}
          {mode === 'flashcard' && (
            <Card title={`Flash Card ${cardIdx + 1} of ${questions.length}`}>
              <FlashCard
                className="h-56"
                frontClass="bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-xl"
                backClass="bg-white border-2 border-teal-200 text-black shadow-xl"
                front={
                  <div className="text-center space-y-3">
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${DIFF_COLORS[difficulty]}`}>
                      {difficulty}
                    </span>
                    <p className="text-lg font-semibold leading-snug px-2">
                      {questions[cardIdx]?.question || questions[cardIdx]}
                    </p>
                  </div>
                }
                back={
                  <div className="text-center space-y-2">
                    <p className="text-sm font-bold text-teal-600 uppercase tracking-wide">Answer</p>
                    <p className="text-base leading-relaxed">
                      {questions[cardIdx]?.answer || 'See explanation below.'}
                    </p>
                    {questions[cardIdx]?.options?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Options: {questions[cardIdx].options.join(' | ')}
                      </p>
                    )}
                  </div>
                }
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => { setCardIdx((i) => Math.max(0, i - 1)) }}
                  disabled={cardIdx === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => markAnswered(cardIdx)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    answered.has(cardIdx)
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  <CheckCircle size={16} />
                  {answered.has(cardIdx) ? 'Marked!' : 'Got it'}
                </button>
                <button
                  onClick={() => { setCardIdx((i) => Math.min(questions.length - 1, i + 1)) }}
                  disabled={cardIdx === questions.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </Card>
          )}

          {/* List Mode */}
          {mode === 'list' && (
            <Card title="Generated Questions">
              <ol className="space-y-4">
                {questions.map((question, index) => {
                  const q = question.question || question
                  const opts = question.options || []
                  const ans = question.answer
                  return (
                    <li
                      key={q + index}
                      className={`p-4 rounded-xl border transition-colors ${
                        answered.has(index)
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-teal-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-black">{index + 1}. {q}</p>
                          {opts.length > 0 && (
                            <div className="mt-3 grid sm:grid-cols-2 gap-2">
                              {opts.map((opt) => (
                                <div
                                  key={opt}
                                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-colors"
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}
                          {ans && answered.has(index) && (
                            <p className="mt-2 text-sm font-medium text-emerald-700">
                              ✓ Answer: {ans}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => markAnswered(index)}
                          className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                            answered.has(index)
                              ? 'text-emerald-500'
                              : 'text-gray-300 hover:text-teal-500'
                          }`}
                        >
                          <CheckCircle size={20} />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
