import { getProjectByDocumentId } from "../../../../lib/api"
import ProjectGallery from "../../../app/components/ProjetGallery"

interface Props {
  params: {
    documentId: string
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectByDocumentId(params.documentId)

  if (!project) {
    return <div className="p-10">Projet introuvable</div>
  }

  return (
    <div className="p-10 bg-[#F5EFE3]">
      <ProjectGallery images={project.gallery} />
    </div>
  )
}
