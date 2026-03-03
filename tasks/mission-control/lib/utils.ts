import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculatePriority(impact: number, timeEstimate: number): number {
  if (timeEstimate === 0) return impact
  return Math.round((impact / timeEstimate) * 10) / 10
}

export function getAgentColor(agent: string): string {
  const colors: { [key: string]: string } = {
    ARIA: 'text-pink-500',
    NOVA: 'text-purple-500',
    BYTE: 'text-blue-500',
    PULSE: 'text-green-500',
    QUINN: 'text-yellow-500',
    ECHO: 'text-orange-500',
  }
  return colors[agent] || 'text-gray-500'
}

export function getStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    backlog: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    review: 'bg-yellow-500',
    done: 'bg-green-500',
    Planning: 'bg-gray-500',
    Executing: 'bg-blue-500',
    Revenue: 'bg-green-500',
    Scaling: 'bg-purple-500',
    prospect: 'bg-gray-500',
    lead: 'bg-blue-500',
    client: 'bg-green-500',
    'case-study': 'bg-purple-500',
  }
  return colors[status] || 'bg-gray-500'
}
