"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"

type Pole = {
  title: string
  members: string
  description: string
  memojis: string[]
}

export default function PolesCarousel({ poles }: { poles: Pole[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [showMemojis, setShowMemojis] = useState(true)
  const [prevIndex, setPrevIndex] = useState(0)

  const handleChange = (dir: "left" | "right") => {
    setShowMemojis(false)
    setDirection(dir)
    setPrevIndex(index)

    // transition simultanée (cadre + memojis)
    setTimeout(() => {
      setIndex((prev) =>
        dir === "left" ? (prev === 0 ? poles.length - 1 : prev - 1) : (prev === poles.length - 1 ? 0 : prev + 1)
      )
      setShowMemojis(true) // déclenche l’apparition des nouveaux memojis
    }, 400) // identique à la durée de transition du cadre
  }

  const pole = poles[index]
  if (!pole) return <div className="text-center p-10 text-red-500">Aucun pôle disponible</div>

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  }

  const memojiContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const memojiItem: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 20,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="pt-16 pb-8 mt-10 overflow-hidden bg-[#F5EFE3] ">
      <h2 className="sm:text-5xl text-4xl font-azoSuper flex md:justify-start justify-center text-[#01794D] mb-10 px-4 md:ml-20">Nos Experts</h2>

      {/* === Desktop layout === */}
      <div className="hidden md:flex items-center justify-center gap-8 px-4">
        <button onClick={() => handleChange("left")} className="flex items-center text-lg font-azoSans font-bold hover:scale-110 transition-transform">
          <img src="/icons/parentheses.svg" alt="prev" className="mr-4 h-8" />
          <span>Précédent</span>
        </button>

        <div className="relative w-full max-w-2xl min-h-[220px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.10)] rounded-2xl p-6 text-black flex flex-col  text-center"

            >
              <h3 className="text-lg font-azoSansRegular font-bold ">{pole.title}</h3>
              <p className="text-sm italic font-azoSansRegular text-gray-500">{pole.members}</p>
              <div className="mt-3 text-sm md:text-lg whitespace-pre-line font-azoSansRegular max-h-[250px] overflow-y-auto pr-2">
                {pole.description}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => handleChange("right")} className="flex items-center text-lg font-azoSans font-bold hover:scale-110 transition-transform">
          <span className="mr-4">Suivant</span>
          <img src="/icons/parentheses.svg" alt="next" className="rotate-180 h-8" />
        </button>
      </div>

      {/* === Mobile layout === */}
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:hidden ">
        <div className="relative w-full max-w-xl min-h-[200px] ">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute  text-center inset-0 bg-white  shadow-[0px_0px_10px_rgba(0,0,0,0.10)] rounded-2xl p-6 pt-2 text-black text-left"
            >
              <h3 className="text-lg font-azoSansMedium text-center">{pole.title}</h3>
              <p className="text-sm italic text-center text-gray-500">{pole.members}</p>
              <div className="mt-3 font-azoSansRegular text-sm whitespace-pre-line max-h-[230px] overflow-y-auto pr-2">
                {pole.description}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between w-full mt-2 px-4">
          <button onClick={() => handleChange("left")} className="flex items-center text-lg font-azoSans font-bold hover:scale-110 transition-transform">
            <img src="/icons/parentheses.svg" alt="prev" className="mr-2 h-6" />
            <span>Précédent</span>
          </button>

          <button onClick={() => handleChange("right")} className="flex items-center text-lg font-azoSans font-bold hover:scale-110 transition-transform">
            <span className="mr-2">Suivant</span>
            <img src="/icons/parentheses.svg" alt="next" className="rotate-180 h-6" />
          </button>
        </div>
      </div>

      {/* Memoji */}
      <div className="relative mt-8 min-h-[250px]">
        <AnimatePresence mode="wait">
          {!showMemojis && (
            <motion.div
              key={`memojis-exit-${prevIndex}`}
              variants={memojiContainer}
              initial="visible"
              animate="hidden"
              exit="hidden"
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
            >
              {poles[prevIndex].memojis.map((src, i) => (
                <motion.div
                  key={i}
                  variants={memojiItem}
                  exit="exit"
                  className="max-w-[30%] sm:w-48 sm:h-48 aspect-square rounded-full bg-[#D2E4BB] flex items-center justify-center"
                >
                  <img src={src} alt={`Memoji ${i}`} className="object-cover rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {showMemojis && (
            <motion.div
              key={`memojis-${index}`}
              variants={memojiContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
            >
              {poles[index].memojis.map((src, i) => (
                <motion.div
                  key={i}
                  variants={memojiItem}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.7 }}
                  className="max-w-[30%] sm:w-48 sm:h-48 aspect-square rounded-full bg-[#D2E4BB] flex items-center justify-center"
                >
                  <img src={src} alt={`Memoji ${i}`} className="object-cover rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
