"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface CardData {
  title: string
  image: string
  description?: string
}

interface ServiceBlockProps {
  index: number
  title: string
  description: string
  cards: CardData[]
  bgColor?: string
}

export default function ServiceBlock({
  index,
  title,
  description,
  cards,
  bgColor = "white",
}: ServiceBlockProps) {
  // Détermine la bonne classe de grille selon le nombre de cards
  const getGridClass = () => {
    if (cards.length === 1) {
      return "grid-cols-1 justify-items-center"
    } else if (cards.length === 2) {
      return "grid-cols-1 sm:grid-cols-2 justify-items-center"
    } else {
      return "grid-cols-1 md:grid-cols-3"
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`${
        bgColor === "white"
          ? "bg-[#F5EFE3] text-black"
          : "bg-[#F5EFE3] text-black"
      } py-16 px-4`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`md:text-6xl text-4xl font-azoSuper mb-4 ${
            bgColor === "white" ? "text-[#01794D]" : "text-[#01794D]"
          }`}
        >
          {index}. {title}
        </h2>

        <p className="md:text-xl text-sl whitespace-pre-line font-azoSansMedium mb-8">
          {description}
        </p>

        <div className={`grid gap-4 ${getGridClass()}`}>
          {cards.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function Card({ card, index }: { card: CardData; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group cursor-pointer w-full "
      onClick={() => setIsOpen(!isOpen)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative w-full h-[500px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className={`object-cover transition duration-300 ${
            isOpen ? "blur-sm scale-105" : ""
          }`}
        />
      </div>

      {/* Overlay sombre permanent */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenu principal */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-20">
        <h3 className="text-3xl font-azoBlack text-[#F5EFE3] flex justify-center">
          {card.title}
        </h3>

        <span
          className={`
            text-6xl font-extrabold absolute bottom-4 right-4 z-40
            transition-transform duration-300 ease-in-out
            ${isOpen ? "rotate-45 text-[#F5EFE3]" : "rotate-0 text-white"}
          `}
        >
          +
        </span>
      </div>

      {/* Contenu affiché au clic */}
      {isOpen && (
        <div className="absolute whitespace-pre-line font-azoSansRegular inset-0 flex items-center justify-center text-white text-lg bg-black/60 z-30 p-6 text-center animate-slide-in">
          <p>{card.description || "Texte explicatif à insérer ici..."}</p>
        </div>
      )}
    </motion.div>
  )
}
