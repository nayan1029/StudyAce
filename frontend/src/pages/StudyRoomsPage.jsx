import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import PageHeader from '../components/common/PageHeader'
import { roomsApi } from '../api/roomsApi'

const STATUS_STYLES = {
  LIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  SCHEDULED: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
}

export default function StudyRoomsPage() {
  const { data: rooms = [], isLoading } = useQuery({ queryKey: ['rooms'], queryFn: roomsApi.getAll })

  return (
    <div className="space-y-8">
      <PageHeader title="Collaborative Study Rooms" subtitle="Join live rooms to revise with peers." />

      {isLoading ? (
        <Loader text="Loading study rooms" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <Card
              key={room.id}
              title={room.name}
              action={
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[room.status] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
                >
                  {room.status}
                </span>
              }
            >
              <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <span className="text-slate-400">Members:</span> {room.members}
                </p>
                {room.topic && (
                  <p>
                    <span className="text-slate-400">Topic:</span> {room.topic}
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1">Join Chat</Button>
                <Button variant="secondary" className="flex-1">
                  Video
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
