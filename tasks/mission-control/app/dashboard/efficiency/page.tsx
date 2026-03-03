'use client'

import useSWR from 'swr'
import { BarChart3, TrendingUp, DollarSign, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function EfficiencyPage() {
  const { data: metrics = [] } = useSWR('/api/agent-metrics', fetcher, { refreshInterval: 5000 })

  const chartData = metrics.map((m: any) => ({
    agent: m.agent,
    speed: m.avgSpeed,
    quality: m.avgQuality,
    tasks: m.taskCount,
  }))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Agent Efficiency Score</h1>
        <p className="text-gray-400">Track speed, quality, and cost per agent</p>
      </div>

      {metrics.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No agent metrics yet. Metrics are tracked automatically as agents complete tasks.</p>
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 font-bold">Speed & Quality Scores</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="agent" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Legend />
                  <Bar dataKey="speed" fill="#3b82f6" name="Speed Score" />
                  <Bar dataKey="quality" fill="#10b981" name="Quality Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 font-bold">Task Count</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="agent" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Agent Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric: any) => (
              <div key={metric.agent} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold">{metric.agent}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="h-4 w-4" />
                      Speed
                    </div>
                    <span className="font-bold">{metric.avgSpeed.toFixed(1)}/10</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <TrendingUp className="h-4 w-4" />
                      Quality
                    </div>
                    <span className="font-bold">{metric.avgQuality.toFixed(1)}/10</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      Total Cost
                    </div>
                    <span className="font-bold">${metric.totalCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BarChart3 className="h-4 w-4" />
                      Tasks
                    </div>
                    <span className="font-bold">{metric.taskCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-6 rounded-lg border border-blue-800 bg-blue-500/10 p-4">
            <h4 className="mb-2 font-bold text-blue-400">💡 Efficiency Insights</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Highest quality: {metrics.reduce((best: any, m: any) => m.avgQuality > (best?.avgQuality || 0) ? m : best, {}).agent}</li>
              <li>• Fastest: {metrics.reduce((best: any, m: any) => m.avgSpeed > (best?.avgSpeed || 0) ? m : best, {}).agent}</li>
              <li>• Most cost-effective: {metrics.reduce((best: any, m: any) => m.totalCost < (best?.totalCost || Infinity) ? m : best, {}).agent}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
