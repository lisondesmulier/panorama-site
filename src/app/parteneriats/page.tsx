import { getPartnershipBlocks, getPartnershipIntro } from "../../../lib/api"
import PartnersIntro from "../components/partnersIntro"
import PartnershipBlock from "../components/PaartnershipBlock"

export default async function Partenariats() {
  const blocks = await getPartnershipBlocks()
  const intro = await getPartnershipIntro()

  return (
    <main className="mt-12 bg-[#F5EFE3]">
      <PartnersIntro
        blocks={blocks}
      />

 
      {blocks.map((block: {
  id: number;
  title: string;
  description: string;
  images: string[];
  displayAsGreenTitle?: boolean;
}, index: number) => (
  <PartnershipBlock
    key={block.id}
    id={block.id}
    title={block.title}
    description={block.description}
    images={block.images}
    displayAsGreenTitle={block.displayAsGreenTitle}
    index={index}

  />
))}


    </main>
  )
}
