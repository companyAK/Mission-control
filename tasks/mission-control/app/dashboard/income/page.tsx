'use client'

import useSWR from 'swr'
import { DollarSign, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function IncomePage() {
  const { data: streams = [] } = useSWR('/api/streams', fetcher, { refreshInterval: 5000 })

  const totalMRR = streams.reduce((sum: number, s: any) => sum + (s.mrr || 0), 0)
  const targetMRR = 10000 // Example target
  const progressPercent = Math.min((totalMRR / targetMRR) * 100, 100)

  // Mock chart data (in production, this would come from historical data)
  const chartData = [
    { month: 'Jan', mrr: 0 },
    { month: 'Feb', mrr: 200 },
    { month: 'Mar', mrr: totalMRR },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Income Dashboard</h1>
        <p className="text-gray-400">Real-time MRR tracking across all streams</p>
      </div>

      {/* Total MRR Card */}
      <div className="mb-6 rounded-lg border border-gray-800 bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8">
        <div className="mb-4 flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Total Monthly Recurring Revenue</p>
            <h2 className="text-4xl font-bold text-green-400">{formatCurrency(totalMRR)}</h2>
          </div>
        </div>
        
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-400">Progress to "Financially Set" Goal</span>
          <span className="font-medium">{progressPercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-blue-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Target: {formatCurrency(targetMRR)}/mo</p>
      </div>

      {/* MRR Chart */}
      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="mb-4 font-bold">MRR Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              formatter={(value: any) => formatCurrency(value)}
            />
            <Line type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stream Breakdown */}
      <div className="grid gap-4">
        <h3 className="font-bold">Revenue by Stream</h3>
        {streams.map((stream: any, idx: number) => (
          <div key={stream.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">#{idx + 1}</span>
                <div>
                  <h4 className="font-medium">{stream.name}</h4>
                  <p className="text-xs text-gray-500">{stream.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-400">{formatCurrency(stream.mrr)}</p>
                <p className="text-xs text-gray-500">/month</p>
              </div>
            </div>
          </div>
        ))}
        
        {streams.length === 0 && (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-600" />
            <p className="text-gray-400">No income streams tracked yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
