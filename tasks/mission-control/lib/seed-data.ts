/**
 * Seed Data for Mission Control Dashboard
 * Populates empty pages with real content
 */

export const seedTasks = [
  {
    id: '1',
    title: 'Build Service Agency Website',
    description: 'Create proof-of-concept website for your own agency',
    status: 'in-progress',
    priority: 'high',
    assignee: 'ARIA-WEB',
    dueDate: '2026-03-07',
  },
  {
    id: '2',
    title: 'Research 10 Austin Prospects',
    description: 'Deep dive into pain points, how to reach them, pitch angles',
    status: 'in-progress',
    priority: 'high',
    assignee: 'NOVA',
    dueDate: '2026-03-06',
  },
  {
    id: '3',
    title: 'Create Pitch Script & Messaging',
    description: 'Write exact words for outreach (email, call, LinkedIn)',
    status: 'backlog',
    priority: 'high',
    assignee: 'QUINN',
    dueDate: '2026-03-08',
  },
  {
    id: '4',
    title: 'Deploy Health Monitoring',
    description: 'Enable daily health checks (06:00 UTC)',
    status: 'backlog',
    priority: 'medium',
    assignee: 'BYTE',
    dueDate: '2026-03-10',
  },
  {
    id: '5',
    title: 'Enable Automation Tasks',
    description: 'Activate 8 scheduled jobs (learning reports, metrics, etc.)',
    status: 'backlog',
    priority: 'medium',
    assignee: 'IMPL',
    dueDate: '2026-03-11',
  },
]

export const seedProjects = [
  {
    id: 'stream-1',
    name: 'Service Agency (Stream #1)',
    description: 'Web design + hosting for service businesses in Austin',
    status: 'launch',
    progress: 60,
    dueDate: '2026-03-31',
    revenue: '$400-500 setup + $100/mo hosting',
  },
  {
    id: 'stream-2',
    name: 'AI Automation Business (Stream #2)',
    description: 'Build automation systems for businesses',
    status: 'planning',
    progress: 10,
    dueDate: '2026-06-30',
    revenue: 'TBD',
  },
  {
    id: 'stream-3',
    name: 'Digital Products / Etsy (Stream #3)',
    description: 'Create and sell digital products',
    status: 'planning',
    progress: 5,
    dueDate: '2026-07-31',
    revenue: 'TBD',
  },
  {
    id: 'stream-4',
    name: 'Amazon FBA (Stream #4)',
    description: 'Fulfillment by Amazon inventory business',
    status: 'planning',
    progress: 0,
    dueDate: '2026-09-30',
    revenue: 'TBD',
  },
  {
    id: 'stream-5',
    name: 'Ebooks (Stream #5)',
    description: 'Write and sell ebooks on various topics',
    status: 'planning',
    progress: 0,
    dueDate: '2026-08-31',
    revenue: 'TBD',
  },
  {
    id: 'stream-6',
    name: 'Real Estate Rentals (Stream #6)',
    description: 'Buy and rent properties for passive income',
    status: 'planning',
    progress: 0,
    dueDate: '2026-12-31',
    revenue: 'TBD',
  },
  {
    id: 'stream-7',
    name: 'Airbnb / Short-term Rentals (Stream #7)',
    description: 'Short-term rental property management',
    status: 'planning',
    progress: 0,
    dueDate: '2026-12-31',
    revenue: 'TBD',
  },
]

export const seedTeam = [
  {
    id: 'max',
    name: 'MAX',
    role: 'Chief Operations Manager',
    emoji: '👔',
    status: 'active',
    workload: 'High',
  },
  {
    id: 'aria',
    name: 'ARIA',
    role: 'Creative Director (Design)',
    emoji: '🎨',
    status: 'active',
    workload: 'High',
  },
  {
    id: 'nova',
    name: 'NOVA',
    role: 'Research Lead',
    emoji: '🔍',
    status: 'active',
    workload: 'High',
  },
  {
    id: 'byte',
    name: 'BYTE',
    role: 'Engineering Lead',
    emoji: '💻',
    status: 'active',
    workload: 'Medium',
  },
  {
    id: 'pulse',
    name: 'PULSE',
    role: 'Marketing/Operations',
    emoji: '📣',
    status: 'idle',
    workload: 'Low',
  },
  {
    id: 'quinn',
    name: 'QUINN',
    role: 'Writing/Content',
    emoji: '✍️',
    status: 'active',
    workload: 'Medium',
  },
  {
    id: 'echo',
    name: 'ECHO',
    role: 'Humanizer/Quality',
    emoji: '🔊',
    status: 'active',
    workload: 'Medium',
  },
]

export const seedIdeas = [
  {
    id: 'idea-1',
    title: 'AI-powered chatbot for service businesses',
    description: 'Automate customer service with AI',
    stream: 'Stream #2 (AI Automation)',
    status: 'backlog',
  },
  {
    id: 'idea-2',
    title: 'Template marketplace for digital products',
    description: 'Sell pre-built templates on Etsy',
    stream: 'Stream #3 (Digital Products)',
    status: 'backlog',
  },
  {
    id: 'idea-3',
    title: 'Amazon niche research course',
    description: 'Teach people how to find profitable FBA niches',
    stream: 'Stream #4 (Amazon FBA)',
    status: 'backlog',
  },
]

export const seedPipeline = [
  {
    id: 'prospect-1',
    name: 'Austin Plumbing Co',
    status: 'prospect',
    painPoint: 'No website, low online visibility',
    nextAction: 'Initial outreach',
    dueDate: '2026-03-06',
  },
  {
    id: 'prospect-2',
    name: 'Green Landscaping LLC',
    status: 'prospect',
    painPoint: 'Website outdated, no mobile',
    nextAction: 'Follow-up call',
    dueDate: '2026-03-07',
  },
  {
    id: 'prospect-3',
    name: 'Elite Cleaning Services',
    status: 'lead',
    painPoint: 'Can\'t compete without online presence',
    nextAction: 'Send proposal',
    dueDate: '2026-03-08',
  },
]

export const seedIncome = {
  streams: [
    { name: 'Service Agency', mrr: 0, status: 'launching' },
    { name: 'AI Automation', mrr: 0, status: 'planning' },
    { name: 'Digital Products', mrr: 0, status: 'planning' },
    { name: 'Amazon FBA', mrr: 0, status: 'planning' },
    { name: 'Ebooks', mrr: 0, status: 'planning' },
    { name: 'Real Estate', mrr: 0, status: 'planning' },
    { name: 'Airbnb', mrr: 0, status: 'planning' },
  ],
  totalMRR: 0,
  goal: '$10k+ MRR by year-end',
}
