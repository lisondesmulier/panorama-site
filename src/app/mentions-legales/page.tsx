// app/mentions-legales/page.tsx
import { getLegalText } from "../../../lib/api";

export default async function MentionsLegales() {
  const legalHtml = await getLegalText();

  return (
    <main className="bg-white mt-10 px-6 md:px-20 py-20 mx-auto">
      <h1 className="text-3xl font-azoBlack mb-8">Mentions légales</h1>

      {legalHtml ? (
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: legalHtml }}
        />
      ) : (
        // ✅ fallback (ton texte actuel) si rien n'est saisi dans Strapi
        <section>
          {/* ... ton contenu brut actuel ici en secours ... */}
          <p>Contenu en cours de rédaction.</p>
        </section>
      )}
    </main>
  );
}


