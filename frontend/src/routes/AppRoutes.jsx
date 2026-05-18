import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import NotesPage from '../pages/NotesPage'
import SummarizerPage from '../pages/SummarizerPage'
import QuizPage from '../pages/QuizPage'
import TasksPage from '../pages/TasksPage'
import TimetablePage from '../pages/TimetablePage'
import StudyRoomsPage from '../pages/StudyRoomsPage'
import ResumeAnalyzerPage from '../pages/ResumeAnalyzerPage'
import ProfilePage from '../pages/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/summarizer" element={<SummarizerPage />} />
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
  )
}
