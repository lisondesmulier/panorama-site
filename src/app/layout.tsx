// app/layout.tsx
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { getFooter } from "../../lib/api"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

export const metadata = {
  title: "Panorama",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "mask-icon": "/safari-pinned-tab.svg", // Safari macOS (onglet épinglé)
    "theme-color": "#01794D",              // barre d’adresse mobile
  },
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerData = await getFooter()

  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer contactHtml={footerData.contactInfos as BlocksContent} />
      </body>
    </html>
  )
}
