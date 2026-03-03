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
    const streams = await prisma.incomeStream.findMany({
      include: {
        projects: true,
        clients: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(streams)
  }

  if (req.method === 'POST') {
    const stream = await prisma.incomeStream.create({
      data: req.body,
    })
    return res.status(201).json(stream)
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body
    const stream = await prisma.incomeStream.update({
      where: { id },
      data,
    })
    return res.status(200).json(stream)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.incomeStream.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
