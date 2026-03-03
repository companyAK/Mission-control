'use client'

import useSWR from 'swr'
import { TrendingUp } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const statusColors: any = {
  Planning: 'bg-gray-500',
  Executing: 'bg-blue-500',
  Revenue: 'bg-green-500',
  Scaling: 'bg-purple-500',
}

export default function StreamsPage() {
  const { data: streams = [] } = useSWR('/api/streams', fetcher, { refreshInterval: 5000 })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Stream Status Board</h1>
        <p className="text-gray-400">Track all 7 income streams</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {streams.map((stream: any, idx: number) => (
          <div key={stream.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold">{stream.name}</h3>
                  <p className="text-sm text-gray-400">{stream.description}</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-2 rounded-full ${statusColors[stream.status]} px-3 py-1 text-sm font-medium text-white`}>
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                {stream.status}
              </span>
            </div>

            {/* Progress */}
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-400">Overall Progress</span>
                <span className="font-medium">{stream.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className={`h-full ${statusColors[stream.status]} transition-all`}
                  style={{ width: `${stream.progress}%` }}
                />
              </div>
            </div>

            {/* Projects Count */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-400">Active Projects</span>
              <span className="font-medium">{stream.projects?.length || 0}</span>
            </div>
          </div>
        ))}
        
        {streams.length < 7 && (
          <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900/30 p-6 text-center">
            <TrendingUp className="mx-auto mb-3 h-8 w-8 text-gray-600" />
            <p className="text-sm text-gray-500">Add Stream #{streams.length + 1}</p>
          </div>
        )}
      </div>
    </div>
  )
}
