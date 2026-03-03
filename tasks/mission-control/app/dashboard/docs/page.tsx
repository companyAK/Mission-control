'use client'

import useSWR from 'swr'
import { FileText, Filter } from 'lucide-react'
import { useState } from 'react'
import { formatDate } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function DocsPage() {
  const { data: documents = [] } = useSWR('/api/documents', fetcher, { refreshInterval: 5000 })
  const [filterAgent, setFilterAgent] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const agents = ['ARIA', 'NOVA', 'BYTE', 'PULSE', 'QUINN', 'ECHO']
  const types = ['report', 'deliverable', 'note', 'intelligence']

  const filteredDocs = documents.filter((doc: any) => {
    if (filterAgent !== 'all' && doc.agent !== filterAgent) return false
    if (filterType !== 'all' && doc.type !== filterType) return false
    return true
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-gray-400">Repository of all deliverables from agents</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="all">All Agents</option>
            {agents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-12 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No documents found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDocs.map((doc: any) => (
            <div key={doc.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-bold">{doc.title}</h3>
                    <span className="rounded bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                      {doc.type}
                    </span>
                  </div>
                  {doc.agent && (
                    <p className="text-sm text-gray-400">By {doc.agent}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">{formatDate(doc.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{doc.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
