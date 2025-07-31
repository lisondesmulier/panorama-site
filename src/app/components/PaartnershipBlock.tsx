"use client"
import { useState } from "react"

import { motion } from "framer-motion"

type PartnershipBlockProps = {
  id: number;
  title: string;
  description: string;
  images: string[];
  displayAsGreenTitle?: boolean;
  index?: number;
};

// ...imports et composants précédents identiques

export default function PartnershipBlock({
  id,
  title,
  description,
  images,
  displayAsGreenTitle = false,
  index = 0,
}: PartnershipBlockProps) {
  const isEven = index % 2 === 0

  return (
    <motion.section
      id={`block-${id}`}
      className={`bg-[#F5EFE3] ${
  displayAsGreenTitle && images.length === 0 ? "pb-0" : "pb-40"
} scroll-mt-24 relative`}

      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
    

      
{/* Texte */}
{!displayAsGreenTitle && (
  <div className={`w-full flex`}>
    <motion.div
      
      className={`bg-white shadow-xl px-6 md:px-10 py-8 w-full 
  md:max-w-[80%] 
  ${!title ? 'md:mr-auto md:rounded-tr-2xl' : isEven ? 'md:mr-auto' : 'md:ml-auto'} 
  ${isEven ? 'md:rounded-se-2xl' : 'md:rounded-ss-2xl'}
`}

      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl md:text-3xl font-azoBlack text-[#4C4C4C] mb-4">{title}</h3>
      <p className="text-base md:text-lg font-azoSansRegular text-[#797979] whitespace-pre-line">
        {description}
      </p>
    </motion.div>
  </div>
)}

{displayAsGreenTitle && (
  <div className="w-full flex">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        md:max-w-[80%] max-w-5xl bg-[#01794D] text-white font-azoSansRegular
        px-6 md:px-20 py-12 shadow-md mb-10
        ${images.length > 0 ? "rounded-se-2xl" : "rounded-e-2xl"}
      
      `}
    >
      <h3 className={`text-2xl md:text-4xl font-azoSuper ${description ? "mb-6" : " "}`}>{title}</h3>
      <p className="text-base md:text-lg whitespace-pre-line">{description}</p>
    </motion.div>
  </div>
)}

      {/* Affichage des images uniquement si présentes */}
      {images.length > 0 && (
        <>
          {/* Desktop : scroll horizontal */}
          <motion.div
            className="hidden md:flex overflow-x-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="aspect-[3/2] w-[900px] min-w-[900px] flex-shrink-0 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Partenariat ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Mobile : carrousel */}
          <MobileCarousel images={images} />

          {/* Flèche scroll desktop */}
          <div className="hidden md:flex justify-end mt-1">
            <div className="w-10 h-10 animate-slide-x bg-[#CBE4C2] rounded-full flex items-center justify-center shadow">
              <img
                src="/icons/Arrow.svg"
                alt="Scroll horizontal"
                className="w-5 h-5"
              />
            </div>
          </div>
        </>
      )}
    </motion.section>
  )
}


import { useSwipeable } from "react-swipeable"


function MobileCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleNext = () => setCurrent((prev) => (prev + 1) % images.length)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <>
      {/* Mobile Carousel */}
      <div {...handlers} className="md:hidden">
        <div
          className="w-full h-60 overflow-hidden"
          onClick={() => setLightboxIndex(current)}
        >
          <img
            src={images[current]}
            alt={`Image ${current + 1}`}
            className="w-full h-full object-cover transition duration-300"
          />
        </div>

        {/* Bullets */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full border border-black transition ${
                current === i ? "bg-[#01794D]" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
        >
          {/* Image en grand */}
          <img
            src={images[lightboxIndex]}
            alt={`Image agrandie ${lightboxIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // évite la fermeture au clic sur l'image
          />

          {/* Bouton fermeture */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            ×
          </button>

          {/* Navigation précédente */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)
            }}
            className="absolute left-4 text-white text-4xl"
          >
            ‹
          </button>

          {/* Navigation suivante */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev! + 1) % images.length)
            }}
            className="absolute right-4 text-white text-4xl"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}