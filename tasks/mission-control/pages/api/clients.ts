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
    const clients = await prisma.client.findMany({
      include: { stream: true },
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(clients)
  }

  if (req.method === 'POST') {
    const client = await prisma.client.create({
      data: req.body,
    })
    return res.status(201).json(client)
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body
    const client = await prisma.client.update({
      where: { id },
      data,
    })
    return res.status(200).json(client)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    await prisma.client.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
