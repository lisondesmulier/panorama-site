// components/IntroSection.tsx
import Link from "next/link"

type Props = {
  title: string
  description: string
}

export default function IntroSection({ title, description }: Props) {
  return (
    
    <section className="bg-[#01794D] text-white px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Colonne gauche : titre + bouton */}
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl md:text-4xl font-azoSans font-bold leading-tight">
            {title}
          </h2>

          <div className="flex mt-12 md:justify-end justify-center">
            <Link
              href="/societe"
              className="px-6 py-2 border font-azoSansMedium bg-[#D2E4BB] text-[#01794D] rounded-full text-sl hover:bg-white hover:text-green-800 transition w-fit"
            >
              En savoir plus sur la société
            </Link>
          </div>
        </div>
        
        {/* Colonne droite : description */}
        <div className="text-sl md:text-base font-azoSans font-bold leading-relaxed md:translate-y-10">
          {description}
        </div>
      </div>
    </section>
  )
}
