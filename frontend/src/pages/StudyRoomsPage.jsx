import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import { roomsApi } from '../api/roomsApi'

export default function StudyRoomsPage() {
  const { data: rooms = [], isLoading } = useQuery({ queryKey: ['rooms'], queryFn: roomsApi.getAll })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Collaborative Study Rooms</h1>
      {isLoading && <Loader text="Loading study rooms" />}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} title={room.name}>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Members: {room.members}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Status: {room.status}</p>
            {room.topic && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Topic: {room.topic}</p>}
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
