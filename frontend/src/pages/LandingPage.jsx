import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  { title: 'AI Notes Summarizer', desc: 'Turn long notes into crisp key points in seconds.' },
  { title: 'Quiz Generator', desc: 'Practice with MCQs and short questions at any difficulty.' },
  { title: 'Smart Timetable', desc: 'Personalized plans that prioritize your weak subjects.' },
  { title: 'Study Rooms', desc: 'Collaborate, chat, and revise together in real time.' },
]

const stats = [
  { value: '9+', label: 'Study tools' },
  { value: '24/7', label: 'AI assistant' },
  { value: '100%', label: 'Student focused' },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-600/20" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-700/20" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow">
            S
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Study<span className="gradient-text">Ace</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-slate-600 hover:text-brand-600 sm:block dark:text-slate-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn-base bg-brand-gradient text-white shadow-glow hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              AI-powered study companion
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl dark:text-slate-100">
              Study smarter with <span className="gradient-text">StudyAce</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600 dark:text-slate-300">
              Your all-in-one dashboard for notes, quizzes, tasks, timetables, collaboration, and
              placement prep — powered by AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="btn-base bg-brand-gradient px-6 py-3 text-white shadow-glow hover:brightness-110"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn-base border border-slate-300 bg-white px-6 py-3 text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                I have an account
              </Link>
            </div>

            <div className="mt-10 flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-surface animate-fade-up p-5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2l2.09 5.26L20 8l-4 3.9L17 18l-5-2.8L7 18l1-6.1L4 8l5.91-.74L12 2Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
