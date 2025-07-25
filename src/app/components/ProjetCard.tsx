"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  documentId: string
  index?: number
}

export default function ProjectCard({
  title,
  description,
  image,
  documentId,
  index = 0
}: ProjectCardProps) {
  const ref = useRef(null)
const isInView = useInView(ref, { once: true })


  return (
    <div
      ref={ref}
      className="relative h-[600px] group overflow-hidden"
    >
     {image && (
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
)}


      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-6 text-white">
        {/* Titre + description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex-1 flex flex-col justify-center items-center text-center"
        >
          <h3 className="text-2xl font-azoSansMedium mb-4">{title}</h3>
          <p className="text-lg font-azoSansRegular leading-relaxed max-w-[80%]">{description}</p>
        </motion.div>

        {/* Bouton "Voir plus" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-end font-azoSansRegular "
        >
          <a href={`/projets/${documentId}`} className="btn rounded-full mt-6 inline-block font-azoSansMedium px-6 py-2 border-2 border-white rounded-full text-lg hover:bg-white hover:text-black transition">
            Voir plus
          </a>
        </motion.div>
      </div>
    </div>
  )
}
