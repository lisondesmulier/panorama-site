// app/layout.tsx
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { getFooter } from "../../lib/api"
import type { BlocksContent } from "@strapi/blocks-react-renderer"
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";


export const metadata = {
  robots: { index: false, follow: false },
  title: "Panorama",
 icons: {
  icon: [
    { url: "/favicon.ico?v=3", sizes: "any" },
    { url: "/favicon-96x96.png?v=3", sizes: "96x96", type: "image/png" },
    // (tu peux retirer le svg le temps du test)
  ],
  apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
  other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg?v=3", color: "#01794D" }],
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
         <Analytics /> 
      </body>
    </html>
  )
}
