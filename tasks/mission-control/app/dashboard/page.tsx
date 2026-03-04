'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import useSWR from 'swr'
import { tasksApi } from '@/lib/api'
import { Plus, Activity } from 'lucide-react'
import toast from 'react-hot-toast'

const agents = ['ARIA', 'NOVA', 'BYTE', 'PULSE', 'QUINN', 'ECHO']
const statuses = ['backlog', 'in-progress', 'review', 'done']

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function TaskBoard() {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  const { data: tasks = [], mutate } = useSWR('/api/tasks', fetcher, {
    refreshInterval: 5000,
  })
  
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    agent: 'BYTE',
    priority: 'medium',
  })

  const handleAddTask = async () => {
    if (!newTask.title) {
      toast.error('Task title is required')
      return
    }

    try {
      await tasksApi.create(newTask)
      toast.success('Task created!')
      setShowAddTask(false)
      setNewTask({ title: '', description: '', agent: 'BYTE', priority: 'medium' })
      mutate()
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await tasksApi.update(taskId, { status: newStatus })
      mutate()
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const getAgentColor = (agent: string) => {
    const colors: any = {
      ARIA: 'bg-pink-500',
      NOVA: 'bg-purple-500',
      BYTE: 'bg-blue-500',
      PULSE: 'bg-green-500',
      QUINN: 'bg-yellow-500',
      ECHO: 'bg-orange-500',
    }
    return colors[agent] || 'bg-gray-500'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Task Board</h1>
          <p className="text-gray-400">Kanban board for all agent tasks</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {/* Activity Feed */}
      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
          <h2 className="font-semibold">Live Activity</h2>
        </div>
        <div className="space-y-2 text-sm text-gray-400">
          {tasks.slice(0, 3).map((task: any) => (
            <div key={task.id} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${getAgentColor(task.agent)}`} />
              <span>{task.agent} · {task.title}</span>
              <span className="ml-auto text-xs">{new Date(task.updatedAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status} className="flex flex-col">
            <div className="mb-3 rounded-lg bg-gray-800/50 px-3 py-2">
              <h3 className="text-sm font-semibold uppercase text-gray-400">
                {status.replace('-', ' ')}
              </h3>
              <span className="text-xs text-gray-500">
                {tasks.filter((t: any) => t.status === status).length} tasks
              </span>
            </div>
            <div className="flex-1 space-y-2">
              {tasks
                .filter((task: any) => task.status === status)
                .map((task: any) => (
                  <div
                    key={task.id}
                    className="cursor-pointer rounded-lg border border-gray-800 bg-gray-900/50 p-3 transition hover:border-gray-700"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`rounded px-2 py-1 text-xs font-medium ${getAgentColor(task.agent)} text-white`}>
                        {task.agent}
                      </span>
                      {task.priority === 'high' && (
                        <span className="text-xs text-red-400">🔥 High</span>
                      )}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                    {task.description && (
                      <p className="text-xs text-gray-400 line-clamp-2">{task.description}</p>
                    )}
                    <div className="mt-2 flex gap-1">
                      {statuses.map((s) => (
                        s !== task.status && (
                          <button
                            key={s}
                            onClick={() => handleStatusChange(task.id, s)}
                            className="text-xs text-gray-500 hover:text-blue-400"
                          >
                            → {s}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold">Add New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                  rows={3}
                  placeholder="Task description"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Assign To</label>
                <select
                  value={newTask.agent}
                  onChange={(e) => setNewTask({ ...newTask, agent: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                >
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddTask}
                className="flex-1 rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700"
              >
                Create Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
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
