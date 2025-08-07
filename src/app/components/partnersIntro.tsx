"use client"

import { motion } from "framer-motion"
import slugify from "../../../lib/slugify"

type PartnersIntroProps = {
  blocks: {
    id: number;
    title: string;
    description?: string;
    displayAsGreenTitle?: boolean;
    images: string[];
  }[];
};

export default function PartnersIntro({ blocks }: PartnersIntroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full flex bg-[#F5EFE3] justify-start overflow-visible pb-20"
    >
      <div className="relative bg-[#01794D] text-white rounded-br-3xl md:rounded-br-[2rem] shadow-lg px-6 md:px-12 py-12 w-full md:w-[80%] max-w-7xl">
        <h2 className="text-3xl md:text-6xl font-azoSuper mb-6">Nos Partenariats</h2>

        {/* ✅ Pastilles dynamiques */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blocks
            .filter(
              (block) =>
                block.title?.trim() !== "" &&
                !(
                  block.displayAsGreenTitle &&
                  block.title &&
                  block.description &&
                  block.images.length === 0
                )
            )
            .map((block) => (
              <a
                key={block.id}
                 href={`#${slugify(block.title)}`}
                className="bg-[#CBE4C2] text-[#01794D] px-3 py-1 rounded-full md:text-sm text-xs font-semibold hover:bg-gray-200 transition"
              >
                {block.title}
              </a>
            ))}
        </div>

        {/* Bulle flèche */}
        <div className="absolute -bottom-7 right-6 md:right-10 z-10">
          <div className="mt-8 flex justify-center">
            <div className="bg-[#D2E4BB] p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
              <img src="../icons/Arrow.svg" alt="flèche vers le bas" className="rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
