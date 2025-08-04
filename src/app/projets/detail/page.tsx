'use client'

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProjectGallery from '../../components/ProjetGallery'

export default function ProjectDetailPage() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get('id')
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!documentId) return

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project?documentId=${documentId}`)
        const data = await res.json()
        setProject(data)
      } catch (err) {
        console.error("Erreur lors du chargement :", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [documentId])

  if (loading) return <div className="p-10">Chargement...</div>
  if (!project) return <div className="p-10">Projet introuvable</div>

  return (
    <div className="p-10 bg-[#F5EFE3]">
      <ProjectGallery images={project.gallery} />
    </div>
  )
}
