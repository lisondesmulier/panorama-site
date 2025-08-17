// app/layout.tsx
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { getFooter } from "../../lib/api"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

export const metadata = {
  title: "Panorama",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // fallback pour anciens navigateurs
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": "Panorama",
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
