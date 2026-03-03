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
    const ideas = await prisma.automationIdea.findMany({
      orderBy: { priority: 'desc' },
    })
    return res.status(200).json(ideas)
  }

  if (req.method === 'POST') {
    const idea = await prisma.automationIdea.create({
      data: req.body,
    })
    return res.status(201).json(idea)
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body
    const idea = await prisma.automationIdea.update({
      where: { id },
      data,
    })
    return res.status(200).json(idea)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.automationIdea.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
