'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { Code2, Award, Target, Zap, Users } from 'lucide-react'

export default function CareerPage() {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <div className="h-full overflow-auto">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 overflow-hidden">
          {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative px-6 py-16 space-y-6 max-w-4xl mx-auto md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Amadu Kamara
            </h1>
            <p className="text-xl text-cyan-300 font-semibold">24. Austin, TX.</p>

            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Cloud Security Engineer</span> by day.<br />
                <span className="text-cyan-300 font-semibold">Builder</span> by obsession.
              </p>
            </div>

            {/* Badge Row */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-semibold">
                AWS Certified
              </div>
              <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-sm font-semibold">
                Python • C++ • Java
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm font-semibold">
                Systems Architect
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          {/* The Reality */}
          <section className="space-y-6 border-l-4 border-cyan-500 pl-6">
            <h2 className="text-3xl font-bold text-white">The Reality</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I speak six languages: Python, C++, Java, C#, CSS, HTML.
              </p>
              <p className="text-cyan-300 font-semibold text-xl">
                But only one matters: <span className="text-white">Systems that work while I sleep.</span>
              </p>
              <p>
                I don't just write code. I build engines that generate wealth without me.
              </p>
            </div>
          </section>

          {/* The Proof */}
          <section className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-lg p-8 space-y-6">
            <h2 className="text-3xl font-bold text-white">The Proof</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">Last Year</p>
                <p className="text-4xl font-bold text-white">$25k</p>
                <p className="text-gray-400">Credit card debt paid off</p>
              </div>
              <div className="space-y-2">
                <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">This Year</p>
                <p className="text-4xl font-bold text-emerald-300">Scaling</p>
                <p className="text-gray-400">Building 7 income streams</p>
              </div>
            </div>
            <p className="text-gray-300 italic border-t border-emerald-500/30 pt-6">
              I don't post plans. I post receipts.
            </p>
          </section>

          {/* The Mission */}
          <section className="space-y-6 border-l-4 border-purple-500 pl-6">
            <h2 className="text-3xl font-bold text-white">The Mission</h2>
            <p className="text-xl text-purple-300 font-semibold leading-relaxed">
              Build automated systems that generate wealth without requiring my presence.
            </p>
            <div className="space-y-3 text-gray-300 text-lg">
              <p><span className="text-white font-semibold">Why?</span></p>
              <p>
                So my future family never has to choose between security and freedom.
              </p>
              <p className="text-2xl font-bold">
                Not <span className="text-white">rich</span>.{' '}
                <span className="text-purple-300">WEALTHY.</span>
              </p>
              <p>Multiple streams. Real options. Zero compromise.</p>
            </div>
          </section>

          {/* The Game */}
          <section className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-lg p-8 space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400" />
              The Game
            </h2>
            <p className="text-2xl font-bold text-purple-300">
              7 income streams by year-end.
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500 pl-4 py-2">
                <p className="font-semibold text-white text-lg">Stream #1: Service Agency</p>
                <p className="text-purple-300">Launching end of March 2026</p>
                <p className="text-sm text-gray-400">Not an idea. A launch date.</p>
              </div>
              <div className="border-l-2 border-cyan-500 pl-4 py-2">
                <p className="font-semibold text-white text-lg">Streams #2-7</p>
                <p className="text-cyan-300">Already mapped</p>
                <p className="text-sm text-gray-400">Execution mode: ON</p>
              </div>
            </div>
          </section>

          {/* The Philosophy */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white">The Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 hover:border-cyan-500/50 transition">
                <Users className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Delegate</h3>
                <p className="text-gray-400">Hire better than you. Build a team that executes.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 hover:border-purple-500/50 transition">
                <Code2 className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Automate</h3>
                <p className="text-gray-400">Systems beat hustle. Code works while you sleep.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 hover:border-emerald-500/50 transition">
                <Target className="w-8 h-8 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Faceless</h3>
                <p className="text-gray-400">The work works. I don't have to be in it.</p>
              </div>
            </div>
          </section>

          {/* The Vision */}
          <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-2 border-cyan-500/30 rounded-lg p-8 md:p-12 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>

            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-white">The Vision</h2>
              <p className="text-2xl text-gray-300 leading-relaxed">
                Financial freedom isn't a number.<br />
                It's <span className="text-cyan-300 font-semibold">unlimited options.</span>
              </p>
              <div className="space-y-3 text-lg text-gray-400">
                <p>For my family.</p>
                <p>For my future.</p>
                <p>For the life I'm building right now.</p>
              </div>
              <p className="text-2xl font-bold text-emerald-300 pt-4">
                I'm not planning. I'm doing.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8 border-t border-slate-700">
            <p className="text-2xl font-bold text-white">
              Welcome to the build.
            </p>
            <p className="text-gray-400 mt-2">
              Watch this unfold in real-time on the dashboard.
            </p>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
