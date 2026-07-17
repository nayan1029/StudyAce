import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/common/Card'
import FlashCard from '../components/common/FlashCard'
import Loader from '../components/common/Loader'
import { dashboardApi } from '../api/dashboardApi'
import {
  BookOpen,
  CheckSquare,
  BrainCircuit,
  Clock,
  TrendingUp,
  Zap,
  Star,
  Target,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const STUDY_CARDS = [
  {
    subject: 'Data Structures',
    question: 'What is the time complexity of Binary Search?',
    answer: 'O(log n) – Binary Search halves the search space each iteration.',
    color: 'bg-teal-600',
  },
  {
    subject: 'Algorithms',
    question: 'What does Big-O notation represent?',
    answer: 'It describes the worst-case growth rate of an algorithm\'s time or space usage relative to input size.',
    color: 'bg-red-800',
  },
  {
    subject: 'Database',
    question: 'What is a Primary Key?',
    answer: 'A column (or set of columns) that uniquely identifies every row in a table. Must be unique and NOT NULL.',
    color: 'bg-indigo-700',
  },
  {
    subject: 'Networks',
    question: 'What is the OSI Model?',
    answer: '7-layer framework: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    color: 'bg-amber-700',
  },
  {
    subject: 'OOP',
    question: 'What are the 4 pillars of OOP?',
    answer: 'Encapsulation, Abstraction, Inheritance, Polymorphism.',
    color: 'bg-emerald-700',
  },
]

const STAT_CONFIG = [
  { key: 'completedTasks', label: 'Tasks Done', icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { key: 'notesCount',    label: 'Notes',      icon: BookOpen,     color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-200'    },
  { key: 'quizAttempts',  label: 'Quiz Runs',  icon: BrainCircuit, color: 'text-purple-600',  bg: 'bg-purple-50',  border: 'border-purple-200'  },
  { key: 'focusHours',    label: 'Focus Hrs',  icon: Clock,        color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200'   },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const BARS = [40, 65, 45, 80, 70, 90, 60]

const QUICK_LINKS = [
  { label: 'Start Quiz', icon: BrainCircuit, to: '/quiz', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Add Note',   icon: BookOpen,     to: '/notes', color: 'bg-blue-600 hover:bg-blue-700'    },
  { label: 'My Tasks',   icon: CheckSquare,  to: '/tasks', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { label: 'Focus',      icon: Zap,          to: '/timetable', color: 'bg-amber-600 hover:bg-amber-700' },
]

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: dashboardApi.fetchDashboard })
  const [cardIdx, setCardIdx] = useState(0)

  if (isLoading) return <Loader text="Loading dashboard" />

  const stats = data?.stats || {
    completedTasks: 12,
    notesCount: 18,
    quizAttempts: 9,
    focusHours: 26,
  }

  const card = STUDY_CARDS[cardIdx]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Smart Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Your learning hub at a glance</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
          <Star className="text-amber-500" size={16} />
          <span className="text-sm font-semibold text-amber-700">7-day streak!</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CONFIG.map(({ key, label, icon: Icon, color, bg, border }) => (
          <div
            key={key}
            className={`${bg} ${border} border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow`}
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon className={color} size={22} />
            </div>
            <div>
              <p className={`text-3xl font-bold ${color}`}>{stats[key]}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle row: FlashCard + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Flash Card */}
        <Card title="📚 Daily Flash Card">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${card.color}`}>
              {card.subject}
            </span>
            <div className="flex gap-1 items-center">
              <button
                onClick={() => setCardIdx((i) => (i - 1 + STUDY_CARDS.length) % STUDY_CARDS.length)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-gray-400">{cardIdx + 1}/{STUDY_CARDS.length}</span>
              <button
                onClick={() => setCardIdx((i) => (i + 1) % STUDY_CARDS.length)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <FlashCard
            className="h-48"
            frontClass={`${card.color} text-white shadow-lg`}
            backClass="bg-white border-2 border-teal-200 text-black shadow-lg"
            front={
              <p className="text-center text-lg font-semibold leading-snug">{card.question}</p>
            }
            back={
              <p className="text-center text-base leading-relaxed">{card.answer}</p>
            }
          />
          <p className="text-center text-xs text-gray-400 mt-2">Click the card to reveal the answer</p>
        </Card>

        {/* Quick Actions */}
        <Card title="⚡ Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, icon: Icon, to, color }) => (
              <a
                key={label}
                href={to}
                className={`${color} text-white rounded-xl p-4 flex flex-col items-center gap-2 transition-colors font-semibold text-sm shadow-sm hover:shadow-md`}
              >
                <Icon size={24} />
                {label}
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Chart + Tips */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Productivity Chart */}
        <Card title="📈 Weekly Productivity" className="lg:col-span-2">
          <div className="flex items-end gap-2 h-36 pt-2">
            {BARS.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: '120px' }}>
                  <div
                    className="w-full bg-teal-600 rounded-t-md hover:bg-teal-500 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${height}% productivity`}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Study Tips */}
        <Card title="💡 Study Tips">
          <ul className="space-y-3 text-sm text-black">
            {[
              { icon: Target, tip: 'Break sessions into 25-min Pomodoro blocks.' },
              { icon: TrendingUp, tip: 'Review notes within 24h to boost retention.' },
              { icon: Zap, tip: 'Quiz yourself before re-reading material.' },
            ].map(({ icon: Icon, tip }, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-teal-700" />
                </div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
