'use client'

const agents = [
  { name: 'ARIA', role: 'Designer', emoji: '🎨', color: 'bg-pink-500', description: 'Visuals, UI/UX, branding, color palettes, layouts' },
  { name: 'NOVA', role: 'Researcher', emoji: '🔍', color: 'bg-purple-500', description: 'Data, analysis, fact-checking, market research' },
  { name: 'BYTE', role: 'Engineer', emoji: '💻', color: 'bg-blue-500', description: 'Code, debugging, automation, APIs, architecture' },
  { name: 'PULSE', role: 'Marketing', emoji: '📣', color: 'bg-green-500', description: 'Social media strategy, campaigns, growth, analytics' },
  { name: 'QUINN', role: 'Writer', emoji: '✍️', color: 'bg-yellow-500', description: 'Blog posts, copy, scripts, email sequences, SEO' },
  { name: 'ECHO', role: 'Humanizer', emoji: '🔊', color: 'bg-orange-500', description: 'Makes AI content sound natural and human' },
]

const MISSION = "Build automated systems that generate wealth without requiring my presence, so I can provide financial security and unlimited options for my future family."

export default function TeamPage() {
  return (
    <div>
      <div className="mb-8 rounded-lg border border-blue-800 bg-blue-500/5 p-6">
        <h2 className="mb-2 text-lg font-bold text-blue-400">Mission Statement</h2>
        <p className="text-gray-300 leading-relaxed italic">"{MISSION}"</p>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-gray-400">Your AI agent workforce</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div key={agent.name} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${agent.color} text-2xl`}>
                {agent.emoji}
              </div>
              <div>
                <h3 className="font-bold">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{agent.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h3 className="mb-4 font-bold">Device Distribution</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Primary Server</span>
            <span className="font-medium">ALL, NOVA, BYTE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Cloud Workers</span>
            <span className="font-medium">ARIA, PULSE, QUINN, ECHO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
