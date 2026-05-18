import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/common/Card'

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Card title="Account Information">
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-500">Name:</span> {user?.name || 'Student User'}</p>
          <p><span className="text-gray-500">Email:</span> {user?.email || 'student@studyace.app'}</p>
          <p><span className="text-gray-500">Role:</span> {user?.role || 'STUDENT'}</p>
        </div>
      </Card>
    </div>
  )
}
