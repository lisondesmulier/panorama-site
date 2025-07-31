import { getIntroSection, getHomeServices } from "../../lib/api"
import Hero from "./components/Hero"
import IntroSection from "./components/IntroSection"
import LinkdnSection from "./components/LinkdnSection"
import ServicesScrollText from "./components/ServicesScrollSection"
import ProjectsSection from "./components/ProjetsSection"
import PartnershipsSection from "./components/PartnershipsSection"
import BlocVert from "./components/BlocVert"
import { getProjectsSection } from "../../lib/api"
import { getFooter } from "../../lib/api"
import { getPartnershipsSection } from "../../lib/api"

export default async function Home() {
  const data = await getIntroSection()
  const services = await getHomeServices()
 
  const projectSection = await getProjectsSection()
  const partnerships = await getPartnershipsSection();


  if (!data) {
    return <p className="text-red-500 text-center p-10">Erreur de chargement</p>
  }

  return (
    <main>
      <Hero
        phraseAccroche={data.phraseAccroche}
        backgroundImageUrl={data.heroBackground || "/images/BackgroundHome.png"}
      />
      <IntroSection title={data.title} description={data.description} />
      <ServicesScrollText services={services} />
      <BlocVert />
      <LinkdnSection />
    

      {/* ✅ Section dynamique depuis Strapi */}
      <ProjectsSection
        title={projectSection.title}
        buttonText={projectSection.buttonText}
        imageUrlDesktop={projectSection.imageUrlDesktop}
        imageUrlMobile={projectSection.imageUrlMobile}
      />

      <PartnershipsSection
  title={partnerships.title}
  buttonText={partnerships.buttonText}
  imageUrlDesktop={partnerships.imageUrlDesktop}
  imageUrlMobile={partnerships.imageUrlMobile}
/>

    </main>
  )
}
