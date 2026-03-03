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
    const { latest } = req.query
    
    if (latest) {
      const report = await prisma.intelligenceReport.findFirst({
        orderBy: { createdAt: 'desc' },
      })
      return res.status(200).json(report)
    }
    
    const reports = await prisma.intelligenceReport.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
    })
    return res.status(200).json(reports)
  }

  if (req.method === 'POST') {
    const report = await prisma.intelligenceReport.create({
      data: req.body,
    })
    return res.status(201).json(report)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
