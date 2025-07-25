import ServiceBlock from "../components/ServiceBlock"
import { getServicesPage, getFooter } from "../../../lib/api"

export default async function ServicesPage() {
  const data = await getServicesPage()

  interface Card {
  title: string;
  description: string;
  image: { url: string };
} 

interface Bloc {
  title: string;
  description: string;
  bgColor: string;
  card: Card[];
}


  return (
    <main className="mt-12 bg-[#F5EFE3]">
      {/* Header */}
      <div className="relative bg-[#01794D] text-white rounded-br-3xl md:rounded-br-[2rem] shadow-lg px-6 md:px-12 py-12 w-full md:w-[80%] max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-azoSuper mb-2">
          {data.titleSection}
        </h2>
        <div className="absolute -bottom-7 right-6 md:right-20 z-10">
          <div className="mt-8 flex justify-center">
            <div className="bg-[#D2E4BB] p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
              <img src="/icons/arrow.svg" alt="flèche vers le bas" className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Blocks dynamiques */}
      {data.block?.map((bloc: Bloc, index: number) => (

        <ServiceBlock
          key={index}
          index={index + 1}
          title={bloc.title}
          description={bloc.description}
          bgColor={bloc.bgColor}
          cards={bloc.card.map((c: any) => ({
            title: c.title,
            description: c.description,
            image:
  c.image?.url?.startsWith("http")
    ? c.image.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${c.image?.url ?? ""}`

          }))}
        />
      ))}

    </main>
  )
}
