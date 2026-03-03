'use client'

import { Heart, Target, Clock, TrendingUp } from 'lucide-react'

export default function WhyPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Why Board</h1>
        <p className="text-gray-400">Reminder of what all this grinding is for</p>
      </div>

      {/* Hero Section */}
      <div className="mb-8 rounded-lg border border-pink-800 bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-8">
        <Heart className="mb-4 h-12 w-12 text-pink-400" />
        <h2 className="mb-4 text-2xl font-bold">Family Vision</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          Building a future where my kids have <strong>unlimited options</strong> — whether they choose 
          college, trade school, entrepreneurship, or any path they dream of. Financial security means 
          freedom to choose, not necessity to work.
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Financial Target */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Target className="h-8 w-8 text-green-400" />
            <h3 className="text-xl font-bold">Financial Security Target</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Target:</span>
              <span className="text-2xl font-bold text-green-400">$10,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Annual Goal:</span>
              <span className="text-xl font-bold">$120,000</span>
            </div>
            <p className="text-sm text-gray-500">Passive income that covers all expenses + savings + investments</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-400" />
            <h3 className="text-xl font-bold">Timeline to "Set"</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Target Date:</span>
              <span className="text-2xl font-bold text-blue-400">Dec 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Remaining:</span>
              <span className="text-xl font-bold">9 months</span>
            </div>
            <p className="text-sm text-gray-500">When passive income exceeds expenses = financially set</p>
          </div>
        </div>

        {/* Kids' Options */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <h3 className="text-xl font-bold">What Success Looks Like</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">✓</span>
              <span>Kids can choose ANY school without financial stress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">✓</span>
              <span>Trade school, college, or entrepreneurship — all funded</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">✓</span>
              <span>No student debt for the next generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">✓</span>
              <span>Time freedom to be present for family</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">✓</span>
              <span>Generational wealth and options</span>
            </li>
          </ul>
        </div>

        {/* Daily Reminder */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-400" />
            <h3 className="text-xl font-bold">Daily Reminder</h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <p className="font-medium">When you're tired:</p>
            <p className="italic">"This grind is temporary. Financial freedom is permanent."</p>
            <p className="font-medium">When you're stuck:</p>
            <p className="italic">"Every automated system I build brings my family closer to freedom."</p>
            <p className="font-medium">When you're winning:</p>
            <p className="italic">"Keep building. The goal isn't just money — it's OPTIONS for the people I love."</p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-8 rounded-lg border border-blue-800 bg-blue-500/10 p-6 text-center">
        <p className="text-lg italic text-blue-300">
          "The best time to plant a tree was 20 years ago. The second best time is now."
        </p>
        <p className="mt-2 text-sm text-gray-400">You're planting the tree today. Your family will sit in its shade tomorrow.</p>
      </div>
    </div>
  )
}
