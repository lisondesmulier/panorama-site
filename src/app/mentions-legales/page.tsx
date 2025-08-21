// app/mentions-legales/page.tsx
import { getFooter } from "../../../lib/api";
import RichText from "../components/RichText";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export default async function MentionsLegales() {
  const footer = await getFooter();
  const legal = footer.legalText as BlocksContent;

  return (
    <main className="bg-white mt-10 px-6 md:px-20 py-20 mx-auto">
      <h1 className="text-3xl font-azoBlack mb-8">Mentions légales</h1>
      {legal ? <RichText content={legal} /> : <p>Contenu à venir.</p>}
    </main>
  );
}

