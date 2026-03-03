import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculatePriority } from '@/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const ideas = await prisma.idea.findMany({
      orderBy: { priority: 'desc' },
    })
    return res.status(200).json(ideas)
  }

  if (req.method === 'POST') {
    const { impact, timeEstimate, ...rest } = req.body
    const priority = calculatePriority(impact || 5, timeEstimate || 5)
    
    const idea = await prisma.idea.create({
      data: {
        ...rest,
        impact,
        timeEstimate,
        priority,
      },
    })
    return res.status(201).json(idea)
  }

  if (req.method === 'PUT') {
    const { id, impact, timeEstimate, ...rest } = req.body
    const priority = calculatePriority(impact || 5, timeEstimate || 5)
    
    const idea = await prisma.idea.update({
      where: { id },
      data: {
        ...rest,
        impact,
        timeEstimate,
        priority,
      },
    })
    return res.status(200).json(idea)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.idea.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
