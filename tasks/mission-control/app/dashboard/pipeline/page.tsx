'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { clientsApi } from '@/lib/api'
import { Target, Plus, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const stages = ['prospect', 'lead', 'client', 'case-study']

export default function PipelinePage() {
  const { data: clients = [], mutate } = useSWR('/api/clients', fetcher, { refreshInterval: 5000 })
  const [showAdd, setShowAdd] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    stage: 'prospect',
    source: '',
  })

  const handleAdd = async () => {
    if (!newClient.name) {
      toast.error('Name is required')
      return
    }
    try {
      await clientsApi.create(newClient)
      toast.success('Client added!')
      setShowAdd(false)
      setNewClient({ name: '', email: '', stage: 'prospect', source: '' })
      mutate()
    } catch (error) {
      toast.error('Failed to add client')
    }
  }

  const getStageCount = (stage: string) => clients.filter((c: any) => c.stage === stage).length

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Pipeline</h1>
          <p className="text-gray-400">Agency Stream #1 - Sales funnel</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* Funnel Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {stages.map((stage, idx) => {
          const count = getStageCount(stage)
          const prevCount = idx > 0 ? getStageCount(stages[idx - 1]) : 100
          const conversion = prevCount > 0 ? ((count / prevCount) * 100).toFixed(0) : '0'
          
          return (
            <div key={stage} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <p className="mb-1 text-sm uppercase text-gray-400">{stage.replace('-', ' ')}</p>
              <p className="mb-2 text-3xl font-bold">{count}</p>
              {idx > 0 && (
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3" />
                  {conversion}% conversion
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="flex flex-col">
            <div className="mb-3 rounded-lg bg-gray-800/50 px-3 py-2">
              <h3 className="text-sm font-semibold uppercase text-gray-400">
                {stage.replace('-', ' ')}
              </h3>
            </div>
            <div className="flex-1 space-y-2">
              {clients
                .filter((client: any) => client.stage === stage)
                .map((client: any) => (
                  <div
                    key={client.id}
                    className="rounded-lg border border-gray-800 bg-gray-900/50 p-3"
                  >
                    <h4 className="mb-1 font-medium text-sm">{client.name}</h4>
                    {client.email && (
                      <p className="mb-2 text-xs text-gray-500">{client.email}</p>
                    )}
                    {client.source && (
                      <p className="text-xs text-blue-400">via {client.source}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="mt-6 rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
          <Target className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No clients yet. Start building your pipeline!</p>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold">Add New Client</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Stage</label>
                <select
                  value={newClient.stage}
                  onChange={(e) => setNewClient({ ...newClient, stage: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage.replace('-', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Source</label>
                <input
                  type="text"
                  value={newClient.source}
                  onChange={(e) => setNewClient({ ...newClient, source: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  placeholder="e.g., Referral, Google Ads, LinkedIn"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700"
              >
                Add Client
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
