"use client"

import { useEffect, useState } from "react"
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
    <section className="py-20 px-10 md:px-20 bg-white">
      <h2 className="text-3xl text-center mb-20 font-azoSansMedium">Ils nous font confiance</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
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
    </section>
  )
}
