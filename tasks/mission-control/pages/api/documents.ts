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
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(documents)
  }

  if (req.method === 'POST') {
    const document = await prisma.document.create({
      data: req.body,
    })
    return res.status(201).json(document)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
