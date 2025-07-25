"use client"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"


interface Media {
  url: string
  name?: string
  alternativeText?: string
  caption?: string
}

interface Props {
  images: Media[]
}

interface CustomSlide {
  src: string
  description?: string
}

export default function ProjectGallery({ images }: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <>
      {/* Bouton retour */}
      <a
        href="/projets"
        className="fixed top-6 left-6 z-50 bg-[#01794D] text-white px-4 py-2 rounded-full shadow hover:bg-[#D2E4BB] hover:text-[#01794D] transition font-azoSansMedium"
      >
        ← Retour
      </a>

      {/* Grille Masonry avec texte en dessous */}
      <div className="columns-1 mt-12 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
  <motion.div
    key={i}
    className="break-inside-avoid cursor-pointer"
    onClick={() => {
      setIndex(i)
      setOpen(true)
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
  >
    <div className="relative group">
      <img
        src={img.url}
        alt={img.alternativeText || `Image ${i}`}
        className="w-full rounded-lg shadow-md"
      />
      {(img.alternativeText || img.caption) && (
        <div className="font-azoSansRegular absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm px-4 py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {img.alternativeText || img.caption}
        </div>
      )}
    </div>
  </motion.div>
))}

      </div>

      {/* Lightbox */}
      <Lightbox
  open={open}
  close={() => setOpen(false)}
  index={index}
  slides={
    images.map((img) => ({
      src: img.url,
      description: img.alternativeText || img.caption || "",
    })) as CustomSlide[]
  }
  render={{
    slide: ({ slide }: { slide: CustomSlide }) => (
      <div className="relative w-full h-full">
        <img
          src={slide.src}
          alt={slide.description}
          className="object-contain w-full h-full"
        />
        {slide.description && (
          <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm px-4 py-2 text-center">
            {slide.description}
          </div>
        )}
      </div>
    ),
  }}
/>


    </>
  )
}
