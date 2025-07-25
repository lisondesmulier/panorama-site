import { getProjectByDocumentId } from "../../../../lib/api"
import ProjectGallery from "../../../app/components/ProjetGallery"
import { notFound } from "next/navigation"

type PageProps = {
  params: {
    documentId: string
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectByDocumentId(params.documentId)

  if (!project) {
    notFound() // meilleure pratique que de retourner un <div>
  }

  return (
    <div className="p-10 bg-[#F5EFE3]">
      <ProjectGallery images={project.gallery} />
    </div>
  )
}
