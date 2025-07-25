"use client"
import { motion } from "framer-motion"

type Props = {
  phraseAccroche: string
  backgroundImageUrl: string
}

export default function Hero({ phraseAccroche, backgroundImageUrl }: Props) {
  return (
    <section
      className="relative w-full h-[700px] max-h-[90vh] px-6 py-16 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center h-full text-center"
      >
        <img
          src="/icons/LOGOPICTOPANORAMABlanc.svg"
          alt="Logo Panorama"
          className="md:w-1/2 h-auto mb-6"
        />
        <p className="font-azoSansMedium text-sm md:text-xl max-w-md whitespace-pre-line">
          {phraseAccroche}
        </p>
      </motion.div>
    </section>
  )
}
