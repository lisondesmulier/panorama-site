"use client"

import { useEffect, useRef, useState } from "react"

interface Service {
  label: string
  image: string
  description: string
}

export default function ServicesScrollText({ services }: { services: Service[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = section.offsetHeight

      const scrollInSection = viewportHeight - rect.top
      const progress = scrollInSection / sectionHeight

      let index = 0
      if (progress >= 1.1) {
        index = 2
      } else if (progress >= 0.9) {
        index = 1
      }

      setActiveIndex(index)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const activeService = services[activeIndex]

  return (
    <section ref={sectionRef} className="py-20 bg-[#F5EFE3]">
      <div className="max-w-7xl mx-auto px-4 h-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Colonne gauche */}
        <div className="space-y-24">
          {services.map((service, i) => {
            const isActive = i === activeIndex
            const iconSrc = isActive
              ? "/icons/logosimplepanovert.svg"
              : "/icons/LogoSimplePanoramaBlanc.svg"

            return (
              <div key={i} className="space-y-2">
                <div
                  className={`flex items-center gap-4 text-4xl md:text-7xl font-azoSuper transition-colors duration-300 ${
                    isActive ? "text-[#01794D]" : "text-white"
                  }`}
                >
                  <img src={iconSrc} alt="Logo" className="h-[1em] w-auto" />
                  {service.label}
                </div>

                {isActive && (
                  <p className="md:hidden text-gray-600 max-w-md font-azoSans italic leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Colonne droite */}
        <div className="hidden md:grid h-[600px] grid-rows-[1fr_auto] text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <img
              src={activeService.image}
              alt={`Image ${activeService.label}`}
              className="max-w-full w-[250px] h-auto transition duration-500 mx-auto"
            />
            <p className="text-xl text-gray-600 max-w-sm font-azoSans italic leading-relaxed mx-auto">
              {activeService.description}
            </p>
          </div>

          <div className="px-4 mt-6 mr-20">
            <div className="flex justify-end">
              <a
                href="/services"
                className="px-6 py-2 border-[#01794D] font-azoSansMedium bg-[#D2E4BB] text-[#01794D] rounded-full text-sl hover:text-green-800 w-fit transition"
              >
                En savoir plus sur nos services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOUTON mobile uniquement */}
      <div className="md:hidden text-center mt-20">
        <a
          href="/services"
          className="w-fit px-6 py-2 border-[#01794D] font-azoSansMedium bg-[#D2E4BB] text-[#01794D] rounded-full text-sl hover:text-green-800 transition"
        >
          En savoir plus sur nos services
        </a>
      </div>
    </section>
  )
}
