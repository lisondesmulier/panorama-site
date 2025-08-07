"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function StickySwap({
  first,
  second,
  className = "",
}: {
  first: React.ReactNode
  second: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  // La section prend 200vh, on “joue” l’anim de 0 à 1 sur cette hauteur
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"], // bloqué tant que la section n'est pas finie
  })

  // Translate le panneau sticky de 0% à -100% (de Projects vers Partnerships)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

  return (
    <section ref={ref} className={`relative h-[200vh] isolate ${className}`}>
      {/* Sticky = “gèle” le scroll global sur la durée du swap */}
      <div className="sticky top-0 h-screen overflow-hidden z-10 bg-[#F5EFE3]">
        <motion.div style={{ y, willChange: "transform" }} className="h-[200%] w-full">
          {/* Chaque panneau occupe un écran */}
          <div className="h-screen">{first}</div>
          <div className="h-screen">{second}</div>
        </motion.div>
      </div>
    </section>
  )
}
