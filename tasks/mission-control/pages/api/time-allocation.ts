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
    const { week } = req.query
    const allocations = await prisma.timeAllocation.findMany({
      where: week ? { week: week as string } : undefined,
      orderBy: { week: 'desc' },
    })
    return res.status(200).json(allocations)
  }

  if (req.method === 'POST') {
    const { week, category, hours } = req.body
    
    // Upsert - update if exists, create if not
    const allocation = await prisma.timeAllocation.upsert({
      where: {
        id: `${week}-${category}`, // Composite key simulation
      },
      update: { hours },
      create: { week, category, hours },
    })
    
    return res.status(200).json(allocation)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
