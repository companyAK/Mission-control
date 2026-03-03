'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import { useState } from 'react'

const DEFAULT_CHECKLIST = [
  {
    id: 'arch',
    category: 'Architecture',
    items: [
      { id: 'arch-1', name: 'Architecture approved by Amadu', completed: false },
      { id: 'arch-2', name: 'Tech stack finalized', completed: false },
      { id: 'arch-3', name: 'Database choice confirmed', completed: false },
    ],
  },
  {
    id: 'dev',
    category: 'Development',
    items: [
      { id: 'dev-1', name: 'Code compiles without errors', completed: false },
      { id: 'dev-2', name: 'TypeScript strict mode passes', completed: false },
      { id: 'dev-3', name: 'All dependencies installed', completed: false },
      { id: 'dev-4', name: 'Environment variables set', completed: false },
    ],
  },
  {
    id: 'testing',
    category: 'Testing & QA',
    items: [
      { id: 'test-1', name: 'Dev environment test passed', completed: false },
      { id: 'test-2', name: 'Production environment test passed', completed: false },
      { id: 'test-3', name: 'Database schema matches app', completed: false },
      { id: 'test-4', name: 'QA tested 5+ times', completed: false },
      { id: 'test-5', name: 'No TypeScript errors', completed: false },
      { id: 'test-6', name: 'No runtime errors', completed: false },
    ],
  },
  {
    id: 'security',
    category: 'Security & Compliance',
    items: [
      { id: 'sec-1', name: 'No exposed secrets', completed: false },
      { id: 'sec-2', name: 'HTTPS enabled', completed: false },
      { id: 'sec-3', name: 'Authentication works', completed: false },
      { id: 'sec-4', name: 'SQL injection prevention checked', completed: false },
    ],
  },
  {
    id: 'deployment',
    category: 'Deployment Ready',
    items: [
      { id: 'deploy-1', name: 'Backup/rollback plan ready', completed: false },
      { id: 'deploy-2', name: 'Master-QA sign-off', completed: false },
      { id: 'deploy-3', name: 'Monitoring configured', completed: false },
    ],
  },
]

export default function PreFlightPage() {
  const { status } = useSession()
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST)
  const [projectName, setProjectName] = useState('')

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  const toggleItem = (categoryId: string, itemId: string) => {
    setChecklist(
      checklist.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : category
      )
    )
  }

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = checklist.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.completed).length,
    0
  )
  const percentComplete = Math.round((completedItems / totalItems) * 100)
  const canDeploy = completedItems === totalItems

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto">
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="space-y-4 border-b border-gray-800 pb-6">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold">Pre-Flight Checklist</h1>
            </div>
            <p className="text-gray-400">
              Verify everything before deployment. 100% completion = safe to ship.
            </p>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-300 mb-2 block">
                Project Name
              </span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Plumbing Company Website"
                className="w-full bg-gray-900/50 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </label>
          </div>

          {/* Progress */}
          <div className="space-y-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Completion Progress</div>
                  <div className="text-3xl font-bold text-blue-400">
                    {percentComplete}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {completedItems} of {totalItems} items checked
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded font-semibold ${
                    canDeploy
                      ? 'bg-green-900/30 text-green-400 border border-green-800'
                      : 'bg-amber-900/30 text-amber-400 border border-amber-800'
                  }`}
                >
                  {canDeploy ? '✅ READY TO DEPLOY' : '⏳ NOT READY'}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    canDeploy ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist by Category */}
          <div className="space-y-6">
            {checklist.map((category) => {
              const categoryCompleted = category.items.every((item) => item.completed)
              const categoryProgress = Math.round(
                (category.items.filter((item) => item.completed).length /
                  category.items.length) *
                  100
              )

              return (
                <div key={category.id} className="border border-gray-800 rounded-lg overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gray-900/50 border-b border-gray-800 p-4">
                    <div className="flex items-center gap-3">
                      {categoryCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-400" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{category.category}</h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {category.items.filter((item) => item.completed).length} of{' '}
                          {category.items.length} completed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-400">
                          {categoryProgress}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-4 space-y-3">
                    {category.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(category.id, item.id)}
                          className="w-5 h-5 rounded border-gray-600 text-green-500 cursor-pointer"
                        />
                        <span
                          className={`text-sm transition ${
                            item.completed ? 'text-gray-500 line-through' : 'text-gray-300'
                          } group-hover:text-white`}
                        >
                          {item.name}
                        </span>
                        {item.completed && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-950/90 border-t border-gray-800 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-400">
                  {canDeploy
                    ? '✅ All checks passed. Safe to deploy.'
                    : `⏳ ${totalItems - completedItems} items remaining before deployment`}
                </p>
              </div>
              <div className="flex gap-2 lg:gap-3">
                <button className="flex-1 lg:flex-initial px-3 lg:px-4 py-2 rounded border border-gray-700 text-gray-300 hover:text-white transition text-sm">
                  Save Draft
                </button>
                <button
                  disabled={!canDeploy}
                  className={`flex-1 lg:flex-initial px-3 lg:px-6 py-2 rounded font-semibold transition text-sm lg:text-base ${
                    canDeploy
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canDeploy ? '🚀 Deploy Now' : 'Complete to Deploy'}
                </button>
              </div>
            </div>
          </div>

          {/* Spacer for fixed action bar */}
          <div className="h-20" />
        </div>
      </div>
    </DashboardLayout>
  )
}
