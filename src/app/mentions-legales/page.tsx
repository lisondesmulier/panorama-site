export default function MentionsLegales() {
  return (
    <main className="bg-white mt-10 px-6 md:px-20 py-20 mx-auto">
      <h1 className="text-3xl font-azoBlack mb-8">Mentions légales</h1>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Éditeur du site</h2>
        <p>
          Ce site est édité par <strong>PANORAMA</strong>, dont le siège social est situé :
          <br />
          Rue du Mont Gallois 91, 7700 Mouscron – Belgique.
        </p>
        <p>
          Contact :{" "}
          <a href="mailto:contact@panorama.be.com" className="underline">
            contact@panorama.be.com
          </a>
          <br />
          Téléphone : +32 56 39 19 70
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Responsable de la publication</h2>
        <p>Le responsable de la publication est : société PANORAMA</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Hébergement</h2>
        <p>
          Le site est hébergé par : <br />
          <strong>Railway (railway.app)</strong>
          <br />
          Les données médias sont stockées sur <strong>Cloudinary</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu de ce site (textes, images, graphismes, logo, vidéos, etc.) est la
          propriété exclusive de Panorama, sauf mentions contraires.
          <br />
          Toute reproduction, distribution, modification, adaptation ou publication sans autorisation écrite est strictement interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Protection des données</h2>
        <p>
          Aucune donnée personnelle n’est collectée sans votre consentement. Les données envoyées
          via le formulaire de contact sont traitées uniquement dans le cadre de votre demande et
          ne sont jamais transmises à des tiers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">Cookies</h2>
        <p>
          Ce site n’utilise pas de cookies ni d’outils de suivi. Aucun traceur n’est déposé lors de
          votre navigation.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-lg">Crédits</h2>
        <p>Site développé par Panorama. Design & contenus : propriété de Panorama.</p>
      </section>
    </main>
  )
}

