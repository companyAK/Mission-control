'use client'

import { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Users, 
  Calendar,
  FileText,
  DollarSign,
  TrendingUp,
  Lightbulb,
  Clock,
  BarChart3,
  Target,
  Heart,
  Sparkles,
  LogOut
} from 'lucide-react'

const MISSION_STATEMENT = "Build automated systems that generate wealth without requiring my presence, so I can provide financial security and unlimited options for my future family."

const navigation = [
  { name: 'Pre-Flight', href: '/dashboard/preflight', icon: Sparkles },
  { name: 'Task Board', href: '/dashboard', icon: CheckSquare },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Organization', href: '/dashboard/org', icon: Users },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Docs', href: '/dashboard/docs', icon: FileText },
  { name: 'Income', href: '/dashboard/income', icon: DollarSign },
  { name: 'Streams', href: '/dashboard/streams', icon: TrendingUp },
  { name: 'Ideas', href: '/dashboard/ideas', icon: Lightbulb },
  { name: 'Time Budget', href: '/dashboard/time', icon: Clock },
  { name: 'Agent Efficiency', href: '/dashboard/efficiency', icon: BarChart3 },
  { name: 'Client Pipeline', href: '/dashboard/pipeline', icon: Target },
  { name: 'Why Board', href: '/dashboard/why', icon: Heart },
  { name: 'Automation Ideas', href: '/dashboard/automation', icon: Sparkles },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-800 p-4">
            <h1 className="text-xl font-bold text-blue-500">Mission Control</h1>
            <p className="text-xs text-gray-400 mt-1">@{session?.user?.name || session?.user?.email || 'Amadu'}</p>
          </div>

          {/* Mission Statement */}
          <div className="border-b border-gray-800 p-4 bg-blue-500/5">
            <p className="text-xs text-blue-400 leading-relaxed italic">
              "{MISSION_STATEMENT}"
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="border-t border-gray-800 p-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
