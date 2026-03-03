import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Tasks API
export const tasksApi = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  update: (id: string, data: any) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
}

// Streams API
export const streamsApi = {
  getAll: () => api.get('/streams'),
  getById: (id: string) => api.get(`/streams/${id}`),
  create: (data: any) => api.post('/streams', data),
  update: (id: string, data: any) => api.put(`/streams/${id}`, data),
  delete: (id: string) => api.delete(`/streams/${id}`),
}

// Ideas API
export const ideasApi = {
  getAll: () => api.get('/ideas'),
  create: (data: any) => api.post('/ideas', data),
  update: (id: string, data: any) => api.put(`/ideas/${id}`, data),
  delete: (id: string) => api.delete(`/ideas/${id}`),
}

// Clients API
export const clientsApi = {
  getAll: () => api.get('/clients'),
  create: (data: any) => api.post('/clients', data),
  update: (id: string, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: string) => api.delete(`/clients/${id}`),
}

// Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
}

// Cron Jobs API
export const cronJobsApi = {
  getAll: () => api.get('/cron-jobs'),
}

// Documents API
export const documentsApi = {
  getAll: () => api.get('/documents'),
  create: (data: any) => api.post('/documents', data),
}

// Agent Metrics API
export const metricsApi = {
  getAll: () => api.get('/agent-metrics'),
}

// Time Allocation API
export const timeApi = {
  getWeek: (week: string) => api.get(`/time-allocation/${week}`),
  update: (week: string, data: any) => api.post('/time-allocation', { week, ...data }),
}

// Automation Ideas API
export const automationApi = {
  getAll: () => api.get('/automation-ideas'),
  create: (data: any) => api.post('/automation-ideas', data),
  update: (id: string, data: any) => api.put(`/automation-ideas/${id}`, data),
}

// Intelligence Reports API
export const reportsApi = {
  getAll: () => api.get('/intelligence-reports'),
  getLatest: () => api.get('/intelligence-reports/latest'),
}

export default api
