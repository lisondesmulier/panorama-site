// lib/projects.ts
export interface Project {
  id: number
  title: string
  description: string
  image: string
  documentId: string
  gallery: {
    url: string
    name: string
    alternativeText: string
    caption: string
  }[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Yakachanter",
    description: "Un projet de scène mobile pour événements.",
    image: "/images/projects/yakachanter-cover.jpg",
    documentId: "yakachanter",
    gallery: [
      {
        url: "/images/projects/yakachanter-1.jpg",
        name: "yakachanter-1.jpg",
        alternativeText: "Scène de Yakachanter",
        caption: "Vue d'ensemble de la scène"
      },
      {
        url: "/images/projects/yakachanter-2.jpg",
        name: "yakachanter-2.jpg",
        alternativeText: "Concert Yakachanter",
        caption: "En concert"
      }
    ]
  },
  {
    id: 2,
    title: "Enseignes",
    description: "Création et pose d'enseignes lumineuses.",
    image: "/images/projects/enseignes-cover.jpg",
    documentId: "enseignes",
    gallery: [
      {
        url: "/images/projects/enseignes-1.jpg",
        name: "enseignes-1.jpg",
        alternativeText: "Pose enseigne",
        caption: "Pose de nuit"
      }
    ]
  }
]
