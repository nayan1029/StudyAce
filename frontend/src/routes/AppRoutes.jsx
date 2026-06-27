import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from '../components/common/Loader'
import ProtectedApp from '../layouts/ProtectedApp'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const NotesPage = lazy(() => import('../pages/NotesPage'))
const SummarizerPage = lazy(() => import('../pages/SummarizerPage'))
const AssistantPage = lazy(() => import('../pages/AssistantPage'))
const QuizPage = lazy(() => import('../pages/QuizPage'))
const TasksPage = lazy(() => import('../pages/TasksPage'))
const TimetablePage = lazy(() => import('../pages/TimetablePage'))
const StudyRoomsPage = lazy(() => import('../pages/StudyRoomsPage'))
const ResumeAnalyzerPage = lazy(() => import('../pages/ResumeAnalyzerPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Loader text="Loading section..." />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedApp />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/summarizer" element={<SummarizerPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/rooms" element={<StudyRoomsPage />} />
          <Route path="/resume" element={<ResumeAnalyzerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
