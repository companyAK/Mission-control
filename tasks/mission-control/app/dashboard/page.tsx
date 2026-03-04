'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string
}

export default function DashboardPage() {
  const { status } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/seed')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading tasks:', err)
        setLoading(false)
      })
  }, [])

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  const backlog = tasks.filter((t) => t.status === 'backlog')
  const inProgress = tasks.filter((t) => t.status === 'in-progress')
  const review = tasks.filter((t) => t.status === 'review')
  const done = tasks.filter((t) => t.status === 'done')

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-slate-700/50 border border-slate-600 rounded p-3 hover:border-cyan-500 transition cursor-move">
      <div className="font-semibold text-white text-sm">{task.title}</div>
      <div className="text-xs text-gray-400 mt-1">{task.description}</div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-600">
        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
          {task.assignee}
        </span>
        <span className="text-xs text-gray-500">{task.dueDate}</span>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Task Board</h1>
            <p className="text-gray-400 mt-2">Kanban view of active tasks</p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading tasks...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h2 className="font-bold text-white mb-4">📋 Backlog ({backlog.length})</h2>
                <div className="space-y-3">
                  {backlog.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 border border-cyan-700/50 rounded-lg p-4">
                <h2 className="font-bold text-cyan-300 mb-4">🚀 In Progress ({inProgress.length})</h2>
                <div className="space-y-3">
                  {inProgress.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h2 className="font-bold text-white mb-4">👀 Review ({review.length})</h2>
                <div className="space-y-3">
                  {review.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h2 className="font-bold text-white mb-4">✅ Done ({done.length})</h2>
                <div className="space-y-3">
                  {done.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
