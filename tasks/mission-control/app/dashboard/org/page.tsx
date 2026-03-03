'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Users, Zap, Target } from 'lucide-react'

const ORGANIZATION = {
  tier1: [
    {
      id: 'max',
      name: 'MAX',
      title: 'Chief Operations Manager',
      emoji: '👔',
      color: 'bg-purple-900/30',
      description: 'Orchestrator. Strategist. Coach. Coordinates all teams toward the mission.',
    },
  ],
  tier2: [
    {
      id: 'aria',
      name: 'ARIA',
      title: 'Creative Director',
      emoji: '🎨',
      color: 'bg-pink-900/30',
      department: 'Design & Creative',
      subordinates: ['ARIA-WEB', 'ARIA-BRAND', 'ARIA-LAYOUT'],
    },
    {
      id: 'nova',
      name: 'NOVA',
      title: 'Research Director',
      emoji: '🔍',
      color: 'bg-blue-900/30',
      department: 'Research & Intelligence',
      subordinates: ['NOVA-MARKET', 'NOVA-COMPETITOR', 'NOVA-DATA'],
    },
    {
      id: 'byte',
      name: 'BYTE',
      title: 'Engineering Lead',
      emoji: '💻',
      color: 'bg-cyan-900/30',
      department: 'Engineering & Infrastructure',
      subordinates: ['BYTE-BACKEND', 'BYTE-FRONTEND', 'BYTE-DEVOPS'],
    },
    {
      id: 'pulse',
      name: 'PULSE',
      title: 'Marketing Lead',
      emoji: '📣',
      color: 'bg-green-900/30',
      department: 'Marketing & Growth',
      subordinates: ['PULSE-SOCIAL', 'PULSE-ADS', 'PULSE-GROWTH'],
    },
    {
      id: 'quinn',
      name: 'QUINN',
      title: 'Content Director',
      emoji: '✍️',
      color: 'bg-amber-900/30',
      department: 'Content & Communication',
      subordinates: ['QUINN-COPY', 'QUINN-CONTENT', 'QUINN-SCRIPT'],
    },
    {
      id: 'echo',
      name: 'ECHO',
      title: 'Quality Lead',
      emoji: '🔊',
      color: 'bg-orange-900/30',
      department: 'Humanization & Polish',
      subordinates: ['ECHO-TONE', 'ECHO-FLOW', 'ECHO-AUTHENTIC'],
    },
  ],
  tier3: {
    'ARIA-WEB': { title: 'Web Designer', specialty: 'UI/UX, responsive design, user flows' },
    'ARIA-BRAND': { title: 'Brand Specialist', specialty: 'Color theory, typography, brand identity' },
    'ARIA-LAYOUT': { title: 'Layout Architect', specialty: 'Wireframes, information architecture' },
    'NOVA-MARKET': { title: 'Market Analyst', specialty: 'Market sizing, trends, opportunities' },
    'NOVA-COMPETITOR': { title: 'Competitor Intel', specialty: 'Competitive analysis, positioning' },
    'NOVA-DATA': { title: 'Data Analyst', specialty: 'Statistics, verification, patterns' },
    'BYTE-BACKEND': { title: 'Backend Specialist', specialty: 'Databases, APIs, servers, logic' },
    'BYTE-FRONTEND': { title: 'Frontend Specialist', specialty: 'UI implementation, performance' },
    'BYTE-DEVOPS': { title: 'DevOps Engineer', specialty: 'Deployment, scaling, monitoring' },
    'PULSE-SOCIAL': { title: 'Social Media Specialist', specialty: 'TikTok, Instagram, Twitter, LinkedIn' },
    'PULSE-ADS': { title: 'Paid Ads Specialist', specialty: 'Facebook, Google, optimization' },
    'PULSE-GROWTH': { title: 'Growth Hacker', specialty: 'Viral loops, referrals, product-led growth' },
    'QUINN-COPY': { title: 'Copywriter', specialty: 'Sales copy, email, ads, persuasion' },
    'QUINN-CONTENT': { title: 'Content Strategist', specialty: 'Blogs, SEO, long-form content' },
    'QUINN-SCRIPT': { title: 'Scriptwriter', specialty: 'Videos, podcasts, spoken content' },
    'ECHO-TONE': { title: 'Tone Adjuster', specialty: 'Formal to casual conversions' },
    'ECHO-FLOW': { title: 'Flow Editor', specialty: 'Readability, pacing, transitions' },
    'ECHO-AUTHENTIC': { title: 'Authenticity Checker', specialty: 'Removes corporate speak' },
  },
}

export default function OrgPage() {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto">
        <div className="space-y-8 p-6">
          {/* Header */}
          <div className="space-y-4 border-b border-gray-800 pb-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Organization Chart</h1>
            </div>
            <p className="text-gray-400">Your 25-person team working in parallel toward the mission</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-purple-900/20 border border-purple-800 rounded p-3">
                <div className="text-sm text-gray-400">Total Team Size</div>
                <div className="text-2xl font-bold text-purple-400">25 Agents</div>
              </div>
              <div className="bg-blue-900/20 border border-blue-800 rounded p-3">
                <div className="text-sm text-gray-400">Parallelization</div>
                <div className="text-2xl font-bold text-blue-400">18 Specialists</div>
              </div>
              <div className="bg-green-900/20 border border-green-800 rounded p-3">
                <div className="text-sm text-gray-400">Departments</div>
                <div className="text-2xl font-bold text-green-400">6 Teams</div>
              </div>
            </div>
          </div>

          {/* Tier 1: Leadership */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Leadership Tier
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {ORGANIZATION.tier1.map((agent) => (
                <div
                  key={agent.id}
                  className={`${agent.color} border border-purple-800 rounded-lg p-6`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">{agent.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                        <p className="text-purple-300">{agent.title}</p>
                        <p className="text-sm text-gray-400 mt-2">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: Department Heads */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Department Heads (6 Teams)
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {ORGANIZATION.tier2.map((agent) => (
                <div
                  key={agent.id}
                  className={`${agent.color} border border-gray-700 rounded-lg p-4`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{agent.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <p className="text-xs text-gray-400">{agent.title}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <p className="text-xs text-gray-400 font-semibold mb-2">Department</p>
                    <p className="text-sm text-gray-300 mb-3">{agent.department}</p>
                    <p className="text-xs text-gray-400 font-semibold mb-2">Reports To</p>
                    <p className="text-sm text-purple-300">MAX</p>
                  </div>
                  <div className="border-t border-gray-700 mt-3 pt-3">
                    <p className="text-xs text-gray-400 font-semibold mb-2">Specialists</p>
                    <ul className="space-y-1">
                      {agent.subordinates.map((sub) => (
                        <li key={sub} className="text-xs text-gray-400">
                          • {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: Specialists */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Specialist Teams (18 Experts)
            </h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Object.entries(ORGANIZATION.tier3).map(([id, agent]) => (
                <div
                  key={id}
                  className="bg-gray-900/50 border border-gray-700 rounded p-3 hover:border-gray-600 transition"
                >
                  <div className="font-semibold text-white text-sm">{id}</div>
                  <p className="text-xs text-gray-400 mt-1">{agent.title}</p>
                  <p className="text-xs text-gray-500 mt-2 italic">{agent.specialty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="space-y-4 border-t border-gray-800 pt-6">
            <h2 className="text-xl font-bold text-gray-300">How Work Flows</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/30 border border-purple-800 rounded px-4 py-2 text-sm font-semibold">
                  You (CEO)
                </div>
                <div className="text-gray-400">Ask for something</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-gray-600">↓</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/30 border border-purple-800 rounded px-4 py-2 text-sm font-semibold">
                  MAX
                </div>
                <div className="text-gray-400">Orchestrates → routes to right team</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-gray-600">↓</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-900/30 border border-blue-800 rounded px-4 py-2 text-sm font-semibold">
                  Department Head
                </div>
                <div className="text-gray-400">Briefs specialists, owns delivery</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-gray-600">↓</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-900/30 border border-green-800 rounded px-4 py-2 text-sm font-semibold">
                  18 Specialists
                </div>
                <div className="text-gray-400">Work in parallel, deliver quality</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-gray-600">↓</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/30 border border-purple-800 rounded px-4 py-2 text-sm font-semibold">
                  MAX
                </div>
                <div className="text-gray-400">Synthesizes → presents polished result</div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-gray-600">↓</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/30 border border-purple-800 rounded px-4 py-2 text-sm font-semibold">
                  You
                </div>
                <div className="text-gray-400">Review → feedback → MAX learns & adapts</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6 lg:grid-cols-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Parallelization</div>
              <div className="text-2xl font-bold text-green-400 mt-2">18x</div>
              <p className="text-xs text-gray-500 mt-1">work in parallel</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Speed Boost</div>
              <div className="text-2xl font-bold text-blue-400 mt-2">50-70%</div>
              <p className="text-xs text-gray-500 mt-1">faster delivery</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Simultaneous</div>
              <div className="text-2xl font-bold text-purple-400 mt-2">10+</div>
              <p className="text-xs text-gray-500 mt-1">projects at once</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded p-4">
              <div className="text-sm text-gray-400">Coverage</div>
              <div className="text-2xl font-bold text-amber-400 mt-2">100%</div>
              <p className="text-xs text-gray-500 mt-1">all specialties</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
