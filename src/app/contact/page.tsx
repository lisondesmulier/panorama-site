// app/contact/page.tsx
import Footer from "../components/Footer";
import ContactSection from "../components/ContactForm";
import { getContactSection } from "../../../lib/api";

export default async function ContactPage() {
  const data = await getContactSection();

   if (!data) {
    return <div>Erreur : section contact introuvable</div>
  }

  return (
    <main className="mt-12 bg-[#F5EFE3]">
      <ContactSection data={data} />
      
    </main>
  );
}
