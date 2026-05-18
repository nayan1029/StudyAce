import React from 'react'
import Card from '../components/common/Card'

const table = [
  { day: 'Monday', subject: 'Algorithms', time: '09:00 - 11:00' },
  { day: 'Tuesday', subject: 'Database Systems', time: '10:00 - 12:00' },
  { day: 'Wednesday', subject: 'Operating Systems', time: '11:00 - 13:00' },
  { day: 'Thursday', subject: 'Web Development', time: '14:00 - 16:00' },
  { day: 'Friday', subject: 'Placement Prep', time: '16:00 - 18:00' },
]

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Smart Timetable Generator</h1>
      <Card title="Generated Timetable">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">Day</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.day} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">{row.day}</td>
                  <td className="py-2">{row.subject}</td>
                  <td className="py-2">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
