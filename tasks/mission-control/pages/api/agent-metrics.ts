import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const metrics = await prisma.agentMetric.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    // Calculate averages per agent
    const agents = ['ARIA', 'NOVA', 'BYTE', 'PULSE', 'QUINN', 'ECHO']
    const summary = agents.map(agent => {
      const agentMetrics = metrics.filter(m => m.agent === agent)
      const count = agentMetrics.length
      
      if (count === 0) {
        return {
          agent,
          avgSpeed: 0,
          avgQuality: 0,
          totalCost: 0,
          taskCount: 0,
        }
      }
      
      const avgSpeed = agentMetrics.reduce((sum, m) => sum + (m.speedScore || 0), 0) / count
      const avgQuality = agentMetrics.reduce((sum, m) => sum + (m.qualityScore || 0), 0) / count
      const totalCost = agentMetrics.reduce((sum, m) => sum + (m.cost || 0), 0)
      
      return {
        agent,
        avgSpeed: Math.round(avgSpeed * 100) / 100,
        avgQuality: Math.round(avgQuality * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        taskCount: count,
      }
    })
    
    return res.status(200).json(summary)
  }

  if (req.method === 'POST') {
    const metric = await prisma.agentMetric.create({
      data: req.body,
    })
    return res.status(201).json(metric)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
