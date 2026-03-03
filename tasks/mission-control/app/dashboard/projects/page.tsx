'use client'

import useSWR from 'swr'
import { TrendingUp } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function ProjectsPage() {
  const { data: streams = [] } = useSWR('/api/streams', fetcher, { refreshInterval: 5000 })
  const { data: projects = [] } = useSWR('/api/projects', fetcher, { refreshInterval: 5000 })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-400">Track 7 income streams with progress</p>
      </div>

      <div className="grid gap-6">
        {streams.map((stream: any, idx: number) => {
          const streamProjects = projects.filter((p: any) => p.streamId === stream.id)
          
          return (
            <div key={stream.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold">
                    #{idx + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{stream.name}</h2>
                    <p className="text-sm text-gray-400">{stream.description}</p>
                  </div>
                </div>
                {stream.focus && (
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                    🎯 Current Focus
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-medium">{stream.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${stream.progress}%` }}
                  />
                </div>
              </div>

              {streamProjects.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400">Projects ({streamProjects.length})</h3>
                  {streamProjects.map((project: any) => (
                    <div key={project.id} className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{project.name}</span>
                        <span className="text-xs text-gray-400">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        
        {streams.length === 0 && (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-600" />
            <p className="text-gray-400">No income streams yet. Create your first stream to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
