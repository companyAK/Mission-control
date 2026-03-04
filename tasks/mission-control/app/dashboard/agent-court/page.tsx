'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Activity, Users } from 'lucide-react'

// Agent data with work status
const AGENTS = [
  { id: 'max', name: 'MAX', emoji: '👔', role: 'Coach (Manager)', working: true, position: { x: 50, y: 85 } },
  
  // ON COURT (Working)
  { id: 'aria', name: 'ARIA', emoji: '🎨', role: 'Designer', working: true, position: { x: 20, y: 40 } },
  { id: 'nova', name: 'NOVA', emoji: '🔍', role: 'Researcher', working: true, position: { x: 50, y: 30 } },
  { id: 'byte', name: 'BYTE', emoji: '💻', role: 'Engineer', working: true, position: { x: 80, y: 40 } },
  
  // ON BENCH (Idle)
  { id: 'pulse', name: 'PULSE', emoji: '📣', role: 'Marketer', working: false, position: { x: 10, y: 95 } },
  { id: 'quinn', name: 'QUINN', emoji: '✍️', role: 'Writer', working: false, position: { x: 30, y: 95 } },
  { id: 'echo', name: 'ECHO', emoji: '🔊', role: 'Humanizer', working: false, position: { x: 50, y: 95 } },
]

export default function AgentCourtPage() {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  const onCourt = AGENTS.filter((a) => a.working && a.id !== 'max')
  const onBench = AGENTS.filter((a) => !a.working)
  const coach = AGENTS.find((a) => a.id === 'max')

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto">
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="space-y-2 border-b border-gray-800 pb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-400" />
              <h1 className="text-3xl font-bold">Agent Productivity Court 🏀</h1>
            </div>
            <p className="text-gray-400">
              Who's on the court (working) and who's on the bench (idle). Coach MAX directs the play.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-900/20 border border-green-800 rounded p-4">
              <div className="text-sm text-gray-400">On Court</div>
              <div className="text-3xl font-bold text-green-400 mt-2">{onCourt.length}</div>
              <p className="text-xs text-gray-500 mt-1">Working now</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-800 rounded p-4">
              <div className="text-sm text-gray-400">On Bench</div>
              <div className="text-3xl font-bold text-blue-400 mt-2">{onBench.length}</div>
              <p className="text-xs text-gray-500 mt-1">Idle / Available</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-800 rounded p-4">
              <div className="text-sm text-gray-400">Coach</div>
              <div className="text-3xl font-bold text-purple-400 mt-2">1</div>
              <p className="text-xs text-gray-500 mt-1">MAX Managing</p>
            </div>
          </div>

          {/* Basketball Court Visualization */}
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-b from-orange-900/20 to-yellow-900/20">
            {/* Court */}
            <div className="relative w-full aspect-video bg-gradient-to-b from-amber-900/30 to-orange-900/40 border-b-2 border-white/20 p-6">
              {/* Court lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Half court line */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
                {/* Free throw circle */}
                <circle cx="25" cy="50" r="8" fill="none" stroke="white" strokeWidth="0.3" />
                <circle cx="75" cy="50" r="8" fill="none" stroke="white" strokeWidth="0.3" />
                {/* 3-point line */}
                <path d="M 0 30 L 15 30 Q 25 50 15 70 L 0 70" fill="none" stroke="white" strokeWidth="0.3" />
                <path d="M 100 30 L 85 30 Q 75 50 85 70 L 100 70" fill="none" stroke="white" strokeWidth="0.3" />
              </svg>

              {/* ON COURT - Active Agents */}
              <div className="absolute inset-0">
                {onCourt.map((agent) => (
                  <div
                    key={agent.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${agent.position.x}%`,
                      top: `${agent.position.y}%`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-green-500/30 border-2 border-green-400 flex items-center justify-center text-2xl animate-pulse">
                          {agent.emoji}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-green-300"></div>
                      </div>
                      <div className="text-xs font-bold text-green-300 mt-2 text-center whitespace-nowrap">
                        {agent.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COACH - MAX at sideline */}
              {coach && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center text-3xl">
                      {coach.emoji}
                    </div>
                    <div className="text-xs font-bold text-purple-300 mt-2">Coach MAX</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bench */}
            <div className="bg-gray-900/50 border-t border-gray-800 p-4">
              <p className="text-xs font-bold text-gray-400 mb-3 uppercase">🪑 Bench (Idle)</p>
              <div className="flex flex-wrap gap-3">
                {onBench.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition"
                  >
                    <span className="text-xl">{agent.emoji}</span>
                    <span className="text-sm font-semibold text-gray-300">{agent.name}</span>
                    <span className="text-xs text-gray-500">({agent.role})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend & Info */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="bg-green-900/20 border border-green-800 rounded p-4">
              <p className="font-bold text-green-300 mb-2">🏀 On Court</p>
              <p className="text-sm text-gray-400">
                Agents actively working on tasks. Pulsing glow = live activity.
              </p>
            </div>
            <div className="bg-blue-900/20 border border-blue-800 rounded p-4">
              <p className="font-bold text-blue-300 mb-2">🪑 On Bench</p>
              <p className="text-sm text-gray-400">
                Agents available for new work. Ready to jump in when called.
              </p>
            </div>
            <div className="bg-purple-900/20 border border-purple-800 rounded p-4">
              <p className="font-bold text-purple-300 mb-2">👔 Coach</p>
              <p className="text-sm text-gray-400">
                MAX manages play. Calls plays, rotates agents, coordinates team.
              </p>
            </div>
          </div>

          {/* Game Stats */}
          <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Game Status
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Team Size</p>
                <p className="text-2xl font-bold text-white">{AGENTS.length - 1}</p>
                <p className="text-xs text-gray-500">agents + 1 coach</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Current Load</p>
                <p className="text-2xl font-bold text-green-400">{Math.round((onCourt.length / (AGENTS.length - 1)) * 100)}%</p>
                <p className="text-xs text-gray-500">team working</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
