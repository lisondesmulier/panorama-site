"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ContactSectionProps {
  data: {
    phrase1: string;
    phrase2: string;
    titreFormulaire: string;
    options?: { label: string }[];
    image?: {
      url?: string;
    };
  };
}
export default function ContactSection({ data }: ContactSectionProps) {

    if (!data) {
    return (
      <div className="text-red-600 text-center py-10">
        Erreur : données de contact non disponibles.
      </div>
    )
  }
  const content = data;

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    besoin: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact/send`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})

      const response = await res.json()

      if (response.success) {
        setStatus("success")
        alert("Message envoyé avec succès.")
        setFormData({
          prenom: "",
          nom: "",
          email: "",
          telephone: "",
          besoin: "",
          message: "",
        })
      } else {
        setStatus("error")
        alert("Erreur lors de l'envoi.")
      }
    } catch (error) {
      setStatus("error")
      alert("Erreur serveur.")
    }
  }



const imageUrl = "/icons/logoContact.svg"; //

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#F5EFE3] w-full flex flex-col items-center py-12 font-azoSansRegular"
    >
      <section className="w-full flex flex-col items-center py-12 font-azoSansRegular">
        {/* Texte + logo */}
        <div className="text-center px-4 mb-12 max-w-3xl">
          <p className="text-md md:text-lg text-gray-800 font-semibold mb-4">
            {content.phrase1}
          </p>

         <img src={imageUrl} alt="Logo" className="h-10 mx-auto my-4" />


          <p className="text-md md:text-lg text-gray-800 font-semibold mb-6">
            {content.phrase2}
          </p>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-6 mt-6"
          >
            {[
              { href: "https://www.tiktok.com/@panorama_be?_t=ZN-8yK2XfnS138&_r=1", icon: "/icons/tiktok.svg", alt: "TikTok" },
              { href: "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A71708245&keywords=panorama&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=31e68dee-ee17-4c3b-bdac-c6b7e3888b33&sid=ADk&spellCorrectionEnabled=true", icon: "/icons/LinkedIn.svg", alt: "LinkedIn" },
              { href: "https://www.instagram.com/panorama_be?igsh=MWRqcXB3ZGZ5d3N6dA%3D%3D&utm_source=qr", icon: "/icons/Insta.svg", alt: "Instagram" },
            ].map((item, index) => (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-full bg-[#01794D] flex items-center justify-center shadow-md hover:scale-105 transition">
                  <img src={item.icon} alt={item.alt} className="h-6 w-6" />
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Formulaire */}
        <div className="bg-[#01794D] text-white w-full max-w-3xl rounded-md px-6 py-10 shadow-xl">
          <h2 className="text-center text-lg uppercase font-bold mb-8">
            {content.titreFormulaire || "Contactez-nous"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <label className="text-sm mb-1 block">Prénom *</label>
              <input
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                type="text"
                className="w-full p-3 rounded-md text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Nom *</label>
              <input
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                type="text"
                className="w-full p-3 rounded-md text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">E-mail *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full p-3 rounded-md text-gray-800"
                required
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Téléphone</label>
              <input
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                type="tel"
                className="w-full p-3 rounded-md text-gray-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Votre besoin *</label>
              <select
                name="besoin"
                value={formData.besoin}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-white text-gray-800"
              >
                <option value="" disabled hidden>Choisissez une option</option>
                {content.options?.map((opt, i) => (
                  <option key={i} value={opt.label}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 rounded-md text-gray-800 resize-none"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#D8E5C1] text-[#01794D] font-azoBlack px-6 py-2 rounded-full hover:opacity-90 transition"
              >
                {status === "loading" ? "Envoi..." : "ENVOYER"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </motion.section>
  )
}
