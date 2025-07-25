import BrandMarquee from "../components/BrandMarquee";
import IntroLaSociete from "../components/IntroLaSociete";
import PolesCarousel from "../components/PolesCarousel";
import { getIntroLaSociete } from "../../../lib/api";
import { getBrandsliste } from "../../../lib/api";
import { getPoles } from "../../../lib/api";

// app/services/page.tsx
export default async function Societe() {

  interface SocieteContent {
  content: string[]
}

interface Pole {
  title: string
  description: string
  members: string[]
  memojis: string[]
}

interface Brand {
  name: string
  logo: { url: string }
}
const data: SocieteContent = await getIntroLaSociete()
const poles = await getPoles()
const formattedPoles = poles.map(p => ({
  ...p,
  icon: p.icon ?? "" // ou une icône par défaut
}))
const brands: Brand[] = await getBrandsliste()

  if (!data.content || data.content.length === 0) {
    return (
      <div className="text-red-600 text-center p-10">
        Erreur : contenu vide ou invalide.
      </div>
    )
  }

  return (
    <main className=" bg-[#F5EFE3]">     
      <PolesCarousel poles={poles} />
      <BrandMarquee brands={brands} />
      
      <IntroLaSociete content={data.content} />
      
     
    </main>
  )
}
