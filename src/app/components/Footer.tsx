"use client"

import Image from "next/image"
import Link from "next/link"
import RichText from "./RichText"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

type FooterProps = {
  contactHtml: BlocksContent
}

export default function Footer({ contactHtml }: FooterProps) {
  return (
    <footer className="relative bg-[#01794D] text-white px-6 md:px-20 pt-12 pb-28 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <Image
            src="/icons/LOGOPICTOPANORAMABlanc.svg"
            alt="Logo Panorama"
            width={200}
            height={40}
            className="object-contain"
          />

          <div className="text-sm leading-6 max-w-xs">
            {contactHtml ? (
              <RichText content={contactHtml} />
            ) : (
              <p className="italic text-gray-300">Informations de contact indisponibles.</p>
            )}
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-6 items-center md:items-end text-center md:text-right">
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/panorama-be/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image src="/icons/LinkedIn.svg" alt="LinkedIn" width={32} height={32} />
            </a>
            <a
              href="https://www.instagram.com/tonprofil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/icons/insta.svg" alt="Instagram" width={32} height={32} />
            </a>
            <a
              href="https://www.tiktok.com/@tonprofil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <Image src="/icons/tiktok.svg" alt="TikTok" width={32} height={32} />
            </a>
          </div>

          <Link href="/contact">
            <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#006E45] transition font-semibold">
              CONTACTEZ-NOUS
            </button>
          </Link>
        </div>
      </div>

      {/* Filigrane décoratif */}
      <div className="absolute bottom-0 left-0 w-full h-full opacity-10 z-0 pointer-events-none">
        <Image
          src="/icons/LOGOPICTOPANORAMANoir.svg"
          alt="Filigrane Panorama"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </footer>
  )
}
