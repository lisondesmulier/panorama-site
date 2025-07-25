import RichText from "./RichText"

type Props = {
  content: any[]
}

export default function IntroLaSociete({ content }: Props) {
  return (
    <section className="bg-[#01794D] text-white px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto items-center">
        {/* Texte plus petit sur mobile */}
        <div className="font-azoSans font-medium text-base md:text-lg leading-relaxed">
          <RichText content={content} />
        </div>

        {/* Bouton aligné à droite sur desktop, centré sur mobile */}
        <div className="flex md:justify-end justify-center mt-8">
          <button className="w-full md:w-96 mt-12 px-6 py-2 border font-azoSans font-bold rounded-full text-sm hover:bg-white hover:text-green-800 transition">
            En savoir plus sur nos services
          </button>
        </div>
      </div>
    </section>
  )
}
