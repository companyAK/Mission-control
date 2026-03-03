'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { automationApi } from '@/lib/api'
import { Sparkles, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AutomationPage() {
  const { data: ideas = [], mutate } = useSWR('/api/automation-ideas', fetcher, { refreshInterval: 5000 })
  const [showAdd, setShowAdd] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    targetMarket: '',
    problem: '',
    solution: '',
    priority: 5,
  })

  const handleAdd = async () => {
    if (!newIdea.title) {
      toast.error('Title is required')
      return
    }
    try {
      await automationApi.create(newIdea)
      toast.success('Automation idea added!')
      setShowAdd(false)
      setNewIdea({ title: '', description: '', targetMarket: '', problem: '', solution: '', priority: 5 })
      mutate()
    } catch (error) {
      toast.error('Failed to add idea')
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation Ideas Backlog</h1>
          <p className="text-gray-400">Stream #2 - AI automation business ideas</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Idea
        </button>
      </div>

      {ideas.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No automation ideas yet. What should you automate next?</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {ideas.map((idea: any) => (
            <div key={idea.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-bold text-lg">{idea.title}</h3>
                    <span className="rounded bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-400">
                      Priority {idea.priority}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{idea.description}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {idea.targetMarket && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase text-gray-500">Target Market</h4>
                    <p className="text-sm text-gray-300">{idea.targetMarket}</p>
                  </div>
                )}
                {idea.problem && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase text-gray-500">Problem</h4>
                    <p className="text-sm text-gray-300">{idea.problem}</p>
                  </div>
                )}
                {idea.solution && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase text-gray-500">Solution</h4>
                    <p className="text-sm text-gray-300">{idea.solution}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <span className="rounded bg-gray-700 px-2 py-1 text-xs font-medium capitalize">
                  {idea.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6 my-8">
            <h2 className="mb-4 text-xl font-bold">Add Automation Idea</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  placeholder="e.g., Automated Social Media Scheduler for Restaurants"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Description</label>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  rows={3}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Target Market</label>
                  <input
                    type="text"
                    value={newIdea.targetMarket}
                    onChange={(e) => setNewIdea({ ...newIdea, targetMarket: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                    placeholder="e.g., Small restaurants"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Priority (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newIdea.priority}
                    onChange={(e) => setNewIdea({ ...newIdea, priority: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Problem</label>
                <textarea
                  value={newIdea.problem}
                  onChange={(e) => setNewIdea({ ...newIdea, problem: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  rows={2}
                  placeholder="What pain point does this solve?"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Solution</label>
                <textarea
                  value={newIdea.solution}
                  onChange={(e) => setNewIdea({ ...newIdea, solution: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  rows={2}
                  placeholder="How will you automate it?"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700"
              >
                Add Idea
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="rounded-lg border border-gray-700 px-4 py-2 transition hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
