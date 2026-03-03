'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function TimePage() {
  const currentWeek = format(new Date(), 'yyyy-\'W\'II')
  const { data: allocations = [] } = useSWR(`/api/time-allocation?week=${currentWeek}`, fetcher)

  const categories = [
    'Full-time Job',
    'Stream #1 - Agency',
    'Stream #2 - AI Automation',
    'Stream #3',
    'Learning/Research',
    'Personal/Family',
  ]

  const totalHours = allocations.reduce((sum: number, a: any) => sum + a.hours, 0)
  const weeklyAvailable = 168 // Total hours in a week
  const workHours = 40 // Full-time job
  const available = weeklyAvailable - workHours - 56 // minus sleep

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Time Budget</h1>
        <p className="text-gray-400">Weekly hours allocation - week {currentWeek}</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <Clock className="mb-2 h-6 w-6 text-blue-400" />
          <p className="text-sm text-gray-400">Available for Hustle</p>
          <p className="text-3xl font-bold">{available}h</p>
          <p className="text-xs text-gray-500">per week</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <Clock className="mb-2 h-6 w-6 text-green-400" />
          <p className="text-sm text-gray-400">Allocated</p>
          <p className="text-3xl font-bold">{totalHours}h</p>
          <p className="text-xs text-gray-500">{((totalHours / available) * 100).toFixed(0)}% of available</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <Clock className="mb-2 h-6 w-6 text-orange-400" />
          <p className="text-sm text-gray-400">Remaining</p>
          <p className="text-3xl font-bold">{Math.max(0, available - totalHours)}h</p>
          <p className="text-xs text-gray-500">buffer time</p>
        </div>
      </div>

      {/* Allocation Chart */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="mb-4 font-bold">This Week's Focus</h3>
        <div className="space-y-4">
          {categories.map((category) => {
            const allocation = allocations.find((a: any) => a.category === category)
            const hours = allocation?.hours || 0
            const percent = (hours / available) * 100

            return (
              <div key={category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-300">{category}</span>
                  <span className="font-medium">{hours}h</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-yellow-800 bg-yellow-500/10 p-4">
        <p className="text-sm text-yellow-400">
          ⚠️ Time is limited. Focus matters. Full-time job + side hustles = strategic allocation required.
        </p>
      </div>
    </div>
  )
}
