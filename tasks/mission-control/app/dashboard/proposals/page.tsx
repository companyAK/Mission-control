'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { CheckCircle2, AlertCircle, Lightbulb, Clock } from 'lucide-react'
import { useState } from 'react'

const PROPOSALS = [
  {
    id: 1,
    title: 'Build Service Agency Website (First Client-Facing Project)',
    description: 'Your own agency website to show prospects. Proof of concept: build your own site first, then use it to pitch the 10 Austin prospects.',
    reasoning: 'Before pitching, you need proof you can deliver. Your own site IS that proof.',
    impact: 'Enables pitching to 10 prospects end of week',
    effort: '3-4 days (ARIA + QUINN + ECHO)',
    timeline: 'Wednesday-Friday',
    status: 'proposed',
    priority: 'critical',
  },
  {
    id: 2,
    title: 'Create 3 New Dashboard Screens (Conversation History + Decision Log + Weekly Report)',
    description: 'Build the 3 most important Mission Control tools so you can see: all our conversations, decisions made, and what\'s been learned.',
    reasoning: 'Transforms dashboard from task tracker into true command center. You can review everything.',
    impact: 'Full visibility into decisions, progress, learning',
    effort: '2-3 days (BYTE)',
    timeline: 'Wednesday-Thursday',
    status: 'proposed',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Research Austin Prospects + Create Prospect List (Using NOVA)',
    description: 'Deep dive into the 10 Austin prospects NOVA found. Create detailed prospect profiles with: pain points, how to reach them, best pitch angle.',
    reasoning: 'Cold calling without research = low conversion. Good research = warm introduction.',
    impact: 'Ready to pitch 10 prospects with confidence',
    effort: '2 days (NOVA-COMPETITOR + NOVA-MARKET)',
    timeline: 'Monday-Tuesday',
    status: 'proposed',
    priority: 'critical',
  },
  {
    id: 4,
    title: 'Create Outreach Messaging + Pitch Script (Using QUINN + ECHO)',
    description: 'Write the exact words you\'ll use to reach out to prospects. Email template, cold call script, LinkedIn message. Make it conversational.',
    reasoning: 'Good pitch = higher close rate. Bad pitch = wasted prospects.',
    impact: 'Ready to start pitching Monday morning',
    effort: '1-2 days (QUINN-COPY + ECHO)',
    timeline: 'Friday-Monday',
    status: 'proposed',
    priority: 'high',
  },
  {
    id: 5,
    title: 'Set Up CRM (Simple) for Prospect Tracking',
    description: 'Simple spreadsheet or tool to track: prospect name, phone, email, pain points, last contact, next follow-up date.',
    reasoning: 'Can\'t manage 10 prospects in your head. Need visibility.',
    impact: 'Never lose track of a prospect',
    effort: '4 hours (BYTE or manual)',
    timeline: 'Wednesday',
    status: 'proposed',
    priority: 'medium',
  },
]

export default function ProposalsPage() {
  const { status } = useSession()
  const [proposals, setProposals] = useState(PROPOSALS)

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  const handleApprove = (id: number) => {
    setProposals(
      proposals.map((p) =>
        p.id === id ? { ...p, status: 'approved' } : p
      )
    )
  }

  const handleReject = (id: number) => {
    setProposals(
      proposals.map((p) =>
        p.id === id ? { ...p, status: 'rejected' } : p
      )
    )
  }

  const handleAdjust = (id: number) => {
    setProposals(
      proposals.map((p) =>
        p.id === id ? { ...p, status: 'needs-adjustment' } : p
      )
    )
  }

  const approved = proposals.filter((p) => p.status === 'approved').length
  const rejected = proposals.filter((p) => p.status === 'rejected').length
  const needsAdjustment = proposals.filter((p) => p.status === 'needs-adjustment').length

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto">
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="space-y-4 border-b border-gray-800 pb-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-amber-400" />
              <h1 className="text-3xl font-bold">MAX's Proposals</h1>
            </div>
            <p className="text-gray-400">
              Ideas for your next moves. Review, approve, or adjust while you sleep.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Proposed</div>
              <div className="text-2xl font-bold text-amber-400 mt-2">
                {proposals.filter((p) => p.status === 'proposed').length}
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Approved</div>
              <div className="text-2xl font-bold text-green-400 mt-2">{approved}</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Needs Adjustment</div>
              <div className="text-2xl font-bold text-blue-400 mt-2">{needsAdjustment}</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Rejected</div>
              <div className="text-2xl font-bold text-red-400 mt-2">{rejected}</div>
            </div>
          </div>

          {/* Proposals */}
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className={`border rounded-lg overflow-hidden transition ${
                  proposal.status === 'approved'
                    ? 'border-green-800 bg-green-900/20'
                    : proposal.status === 'rejected'
                    ? 'border-red-800 bg-red-900/20'
                    : proposal.status === 'needs-adjustment'
                    ? 'border-blue-800 bg-blue-900/20'
                    : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                {/* Header */}
                <div className="border-b border-gray-800 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {proposal.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            proposal.priority === 'critical'
                              ? 'bg-red-900/50 text-red-300'
                              : proposal.priority === 'high'
                              ? 'bg-amber-900/50 text-amber-300'
                              : 'bg-blue-900/50 text-blue-300'
                          }`}
                        >
                          {proposal.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{proposal.description}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        proposal.status === 'approved'
                          ? 'bg-green-900/50 text-green-300'
                          : proposal.status === 'rejected'
                          ? 'bg-red-900/50 text-red-300'
                          : proposal.status === 'needs-adjustment'
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {proposal.status === 'proposed'
                        ? '⏳ PENDING'
                        : proposal.status === 'approved'
                        ? '✅ APPROVED'
                        : proposal.status === 'rejected'
                        ? '❌ REJECTED'
                        : '🔧 ADJUST'}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">REASONING</p>
                      <p className="text-sm text-gray-300">{proposal.reasoning}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">IMPACT</p>
                      <p className="text-sm text-gray-300">{proposal.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">EFFORT</p>
                      <p className="text-sm text-gray-300">{proposal.effort}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">TIMELINE</p>
                      <p className="text-sm text-gray-300">{proposal.timeline}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {proposal.status === 'proposed' && (
                    <div className="flex gap-2 pt-2 border-t border-gray-700">
                      <button
                        onClick={() => handleApprove(proposal.id)}
                        className="flex-1 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition font-semibold text-sm"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleAdjust(proposal.id)}
                        className="flex-1 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold text-sm"
                      >
                        🔧 Adjust
                      </button>
                      <button
                        onClick={() => handleReject(proposal.id)}
                        className="flex-1 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold text-sm"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 space-y-3">
            <h3 className="font-bold text-blue-300">How This Works</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✅ <strong>Approve:</strong> I start working on it immediately</li>
              <li>🔧 <strong>Adjust:</strong> Tell me what to change, I'll refine it</li>
              <li>❌ <strong>Reject:</strong> I'll skip it and work on approved items</li>
              <li>📊 <strong>Track progress:</strong> Check back here to see status</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
