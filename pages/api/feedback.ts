import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const feedback = await prisma.feedback.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(feedback);
  }

  if (req.method === 'POST') {
    const { name, message } = req.body;
    const feedback = await prisma.feedback.create({ data: { name, message } });
    return res.status(201).json(feedback);
  }

  res.status(405).end();
  
}
