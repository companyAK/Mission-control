'use client'

import useSWR from 'swr'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function CalendarPage() {
  const { data: cronJobs = [] } = useSWR('/api/cron-jobs', fetcher, { refreshInterval: 5000 })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-gray-400">All cron jobs and scheduled tasks</p>
      </div>

      {cronJobs.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
          <CalendarIcon className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No scheduled tasks yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {cronJobs.map((job: any) => (
            <div key={job.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{job.name}</h3>
                  <p className="text-sm text-gray-400">{job.description}</p>
                </div>
                {job.isActive ? (
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-500/20 px-3 py-1 text-xs font-medium text-gray-400">
                    Paused
                  </span>
                )}
              </div>
              
              <div className="grid gap-3 text-sm md:grid-cols-3">
                <div>
                  <span className="block text-xs text-gray-500">Schedule</span>
                  <span className="font-mono text-blue-400">{job.schedule}</span>
                </div>
                {job.agent && (
                  <div>
                    <span className="block text-xs text-gray-500">Agent</span>
                    <span className="font-medium">{job.agent}</span>
                  </div>
                )}
                {job.nextRun && (
                  <div>
                    <span className="block text-xs text-gray-500">Next Run</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="font-medium">{formatDate(job.nextRun)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
