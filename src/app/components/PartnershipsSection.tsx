"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PartnershipsSection({
  title,
  buttonText,
  imageUrlDesktop,
  imageUrlMobile,
  fullHeight = false,
}: {
  title: string
  buttonText: string
  imageUrlDesktop: string | null
  imageUrlMobile: string | null
  fullHeight?: boolean
}) {
  const sectionClass = fullHeight ? "relative w-full h-full overflow-hidden" : "relative w-full h-[500px] overflow-hidden"
  const hasImage = Boolean(imageUrlDesktop || imageUrlMobile)

  return (
    <section className={sectionClass}>
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <div className="block md:hidden">
          {imageUrlMobile && (
            <Image
              src={imageUrlMobile.startsWith("/") ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrlMobile}` : imageUrlMobile}
              alt="Image mobile section partenariats"
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
              src={imageUrlDesktop.startsWith("/") ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrlDesktop}` : imageUrlDesktop}
              alt="Image desktop section partenariats"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        {hasImage && <div className="absolute inset-0 bg-black opacity-10" />}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-start justify-end p-8 md:p-16 z-10"
      >
        <div className="text-right text-white max-w-xl">
          <h2 className="text-4xl md:text-6xl font-azoSuper leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
            {title}
          </h2>
          <Link href="/parteneriats">
            <span className="mt-6 inline-block font-azoSans px-6 py-2 border-2 border-white rounded-full text-white text-lg font-semibold hover:bg-white hover:text-black transition">
              {buttonText}
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
