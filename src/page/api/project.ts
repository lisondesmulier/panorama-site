// pages/api/project.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getProjectByDocumentId } from '../../../lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { documentId } = req.query

  if (typeof documentId !== 'string') {
    return res.status(400).json({ error: 'documentId manquant ou invalide' })
  }

  const project = await getProjectByDocumentId(documentId)

  if (!project) {
    return res.status(404).json({ error: 'Projet introuvable' })
  }

  res.status(200).json(project)
}
