import React from 'react'
import { Navigate } from 'react-router-dom'
import { sessionService } from '../services/session'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = sessionService.isAuthenticated()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
