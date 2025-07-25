type Actualite = {
  id: number
  Titre: string
}

export async function getLinkedinPosts(): Promise<Actualite[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/actualites-sections?sort=createdAt:desc&pagination[limit]=3`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des actualités LinkedIn")
  }

  const json = await res.json()

  return json.data.map((item: any) => ({
    id: item.id,
    Titre: item.Titre,
  }))
}
