import React from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

const rooms = [
  { id: 1, name: 'DSA Night Sprint', members: 12, status: 'Live' },
  { id: 2, name: 'DBMS Revision Pod', members: 8, status: 'Scheduled' },
  { id: 3, name: 'Aptitude Challenge', members: 15, status: 'Live' },
]

export default function StudyRoomsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Collaborative Study Rooms</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} title={room.name}>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Members: {room.members}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Status: {room.status}</p>
            <div className="flex gap-2">
              <Button>Join Chat</Button>
              <Button variant="secondary">Video UI</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
