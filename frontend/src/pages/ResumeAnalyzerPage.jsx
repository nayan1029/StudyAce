import React, { useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('')
  const [result, setResult] = useState(null)

  const analyzeResume = () => {
    const score = Math.min(95, Math.max(58, Math.floor(resumeText.length / 18)))
    setResult({
      score,
      suggestions: [
        'Add quantified achievements in projects.',
        'Include ATS keywords: React, Spring Boot, SQL, REST API.',
        'Keep resume summary under 3 lines.',
      ],
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Resume Assistant</h1>
      <Card title="Paste Resume Content">
        <textarea
          className="w-full min-h-40 px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume text for analysis"
        />
        <div className="mt-3">
          <Button onClick={analyzeResume} disabled={!resumeText.trim()}>Analyze Resume</Button>
        </div>
      </Card>
      {result && (
        <Card title={`ATS Score: ${result.score}/100`}>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {result.suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
          </ul>
        </Card>
      )}
    </div>
  )
}
