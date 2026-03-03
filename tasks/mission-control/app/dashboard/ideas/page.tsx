'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { ideasApi } from '@/lib/api'
import { Lightbulb, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function IdeasPage() {
  const { data: ideas = [], mutate } = useSWR('/api/ideas', fetcher, { refreshInterval: 5000 })
  const [showAdd, setShowAdd] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    impact: 5,
    timeEstimate: 5,
  })

  const handleAdd = async () => {
    if (!newIdea.title) {
      toast.error('Title is required')
      return
    }
    try {
      await ideasApi.create(newIdea)
      toast.success('Idea added!')
      setShowAdd(false)
      setNewIdea({ title: '', description: '', impact: 5, timeEstimate: 5 })
      mutate()
    } catch (error) {
      toast.error('Failed to add idea')
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Idea Capture & Prioritization</h1>
          <p className="text-gray-400">Queue of ideas prioritized by impact/time ratio</p>
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
          <Lightbulb className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No ideas yet. Capture your first idea!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {ideas.map((idea: any) => (
            <div key={idea.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 font-bold">{idea.title}</h3>
                  <p className="text-sm text-gray-400">{idea.description}</p>
                </div>
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-lg font-bold">{idea.priority.toFixed(1)}</span>
                  <span className="text-xs">Score</span>
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Impact:</span>
                  <span className="ml-2 font-medium">{idea.impact}/10</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-2 font-medium">{idea.timeEstimate}h</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-2 font-medium capitalize">{idea.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold">Add New Idea</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
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
              <div>
                <label className="mb-1 block text-sm text-gray-400">Impact (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newIdea.impact}
                  onChange={(e) => setNewIdea({ ...newIdea, impact: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Time Estimate (hours)</label>
                <input
                  type="number"
                  min="1"
                  value={newIdea.timeEstimate}
                  onChange={(e) => setNewIdea({ ...newIdea, timeEstimate: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
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
