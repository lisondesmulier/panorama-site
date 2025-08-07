"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getProjects } from "../../../lib/api"
import ProjectCard from "../components/ProjetCard"
import Footer from "../components/Footer"
import BrandsSection from "../components/BrandsSection"

interface Project {
  id: number
  title: string
  description: string
  image: string
  documentId: string
}

export default function ProjetsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsVisible, setProjectsVisible] = useState(false)


useEffect(() => {
  getProjects().then((data) => {
    setProjects(data)

    // ✅ Délai d'apparition des marques après les projets
    setTimeout(() => setProjectsVisible(true), 1000) // tu peux ajuster à 800ms ou + selon l'animation
  })
}, [])



  return (
    <>
      <section className="bg-[#01794D] text-white text-center py-28 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-azoSuper"
        >
           Nos R<span className="font-azoBlack text-[1.08em] relative">é</span>alisations
</motion.h1>
        {/* FLECHE DANS ROND */}
<div className="mt-8 flex justify-center">
  <div className="bg-[#D2E4BB] p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
    <img src="/icons/Arrow.svg" alt="flèche vers le bas" className="rotate-90" />
  </div>
</div>


      </section>
  

     <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
  {projects.map((projet) => (
    <ProjectCard
      key={projet.documentId || projet.id}
      title={projet.title}
      description={projet.description}
      image={projet.image}
      documentId={projet.documentId}
    />
  ))}

  {/* Bloc de remplissage si nombre impair */}
  {projects.length % 2 !== 0 && (
    <div className="relative h-[600px] bg-[#01794D] flex items-center justify-center">
      <img
        src="/icons/LOGOPICTOPANORAMABlanc.svg"
        alt="Logo Panorama"
        className="w-1/2 max-w-[200px]"
      />
    </div>

  )}

</section>

{projectsVisible && <BrandsSection />}

      
    </>
  )
}
