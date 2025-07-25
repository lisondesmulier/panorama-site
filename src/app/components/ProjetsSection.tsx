"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProjectsSection({
  title,
  buttonText,
  imageUrlDesktop,
  imageUrlMobile,
}: {
  title: string
  buttonText: string
  imageUrlDesktop: string | null
  imageUrlMobile: string | null
}) {

  // ✅ Fonction pour styliser le é
  const formatTitle = (text: string) => {
    const index = text.indexOf("é")
    if (index === -1) return text


    return (
      <>
        {text.substring(0, index)}
        <span className="font-azoBlack text-[1.08em] relative">é</span>
        {text.substring(index + 1)}
      </>
    )
  }

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Image de fond + filtre sombre */}
      <div className="absolute inset-0 z-0">
  {/* Mobile */}
  <div className="block md:hidden">
    {imageUrlMobile && (
      <Image
        src={
          imageUrlMobile.startsWith("/")
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrlMobile}`
            : imageUrlMobile
        }
        alt="Image mobile section projets"
        fill
        className="object-cover"
        priority
      />
    )}
  </div>

  {/* Desktop */}
  <div className="hidden md:block">
    {imageUrlDesktop && (
      <Image
        src={
          imageUrlDesktop.startsWith("/")
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrlDesktop}`
            : imageUrlDesktop
        }
        alt="Image desktop section projets"
        fill
        className="object-cover"
        priority
      />
    )}
  </div>

  <div className="absolute inset-0 bg-black opacity-10" />
</div>


      {/* Contenu animé */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute top-0 right-0 w-full h-full flex items-start justify-end p-8 md:p-16 z-10"
      >
        <div className="text-right text-white ">
          <h2 className="text-4xl md:text-6xl font-azoSuper leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {formatTitle(title)}
          </h2>

          <Link href="/projets">
            <span className="mt-6 inline-block font-azoSans px-6 py-2 border-2 border-white rounded-full text-white text-lg font-semibold hover:bg-white hover:text-black transition">
              {buttonText}
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
