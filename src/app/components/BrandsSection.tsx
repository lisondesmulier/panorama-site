"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getBrands } from "../../../lib/api"

interface Brand {
  id: number
  nom: string
  logoNB: string
  logoCouleur: string
  lien: string
}

export default function BrandsSection() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    getBrands().then(setBrands)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="py-20 md:px-10 md:px-20 bg-white"
    >
      <h2 className="text-3xl text-center mb-20 font-azoBlack">Ils nous font confiance</h2>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-[96rem] mx-auto">

        {brands.map((brand) => {
          const content = (
            <>
              <img
                src={brand.logoNB}
                alt={brand.nom}
                className="absolute inset-0 w-full h-full object-contain grayscale group-hover:opacity-0 transition-opacity duration-300"
              />
              <img
                src={brand.logoCouleur}
                alt={brand.nom}
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </>
          )

          return brand.lien ? (
            <a
              key={brand.id}
              href={brand.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-32 h-20 relative"
            >
              {content}
            </a>
          ) : (
            <div key={brand.id} className="group w-32 h-20 relative">
              {content}
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
