import BrandMarquee from "../components/BrandMarquee";
import HeroLaSociete from "../components/HeroLaSociete";
import IntroLaSociete from "../components/IntroLaSociete";
import Footer from "../components/Footer";
import PolesCarousel from "../components/PolesCarousel";
import { getIntroLaSociete } from "../../../lib/api";
import { getBrandsliste } from "../../../lib/api";
import { getPoles } from "../../../lib/api";

// app/services/page.tsx
export default async function Societe() {
  const data = await getIntroLaSociete()
  const poles = await getPoles()
  const brands = await getBrandsliste();

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
