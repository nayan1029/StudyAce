import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { aiApi } from '../api/aiApi'
import { FileText, Sparkles, ListChecks, Copy, Check } from 'lucide-react'

export default function SummarizerPage() {
  const [text, setText]     = useState('')
  const [copied, setCopied] = useState(false)

  const mutation = useMutation({ mutationFn: aiApi.summarize })

  const copyToClipboard = () => {
    const content = mutation.data?.summary || ''
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="text-teal-600" size={28} />
        <div>
          <h1 className="text-3xl font-bold text-black">AI Summarizer</h1>
          <p className="text-gray-500 text-sm">Condense long notes into crisp summaries</p>
        </div>
      </div>

      {/* Input */}
      <Card title="Paste Your Notes">
        <div className="space-y-3">
          <textarea
            className="w-full min-h-48 px-4 py-3 rounded-xl border border-teal-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm leading-relaxed"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lecture notes, textbook content, or any long text here…"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-xs text-gray-400">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
            <Button
              onClick={() => mutation.mutate({ text })}
              disabled={mutation.isPending || !text.trim()}
              className="flex items-center gap-2"
            >
              <Sparkles size={15} />
              {mutation.isPending ? 'Summarizing…' : 'Generate Summary'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Result */}
      {mutation.data && (
        <div className="space-y-4">
          {/* Summary Card */}
          <Card title="📄 Summary">
            <div className="flex justify-end mb-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-teal-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-50 border border-gray-200"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-sm text-black whitespace-pre-wrap leading-relaxed">
              {mutation.data.summary}
            </p>
          </Card>

          {/* Key Points as Flash-style cards */}
          {mutation.data.keyPoints?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="text-teal-600" size={18} />
                <h3 className="font-semibold text-black">Key Points</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mutation.data.keyPoints.map((point, i) => (
                  <div
                    key={point}
                    className="bg-white border-l-4 border-teal-500 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs font-bold text-teal-600 block mb-1">#{i + 1}</span>
                    <p className="text-sm text-black leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
