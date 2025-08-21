export async function getIntroSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/intro-sections?populate=heroBackground`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 }
  })


  const json = await res.json()
  const entry = json.data?.[0]

  if (!entry) return null

  return {
  title: entry.title,
  description: entry.description,
  phraseAccroche: entry.phraseAccroche,
  heroBackground: entry.heroBackground?.url
  ? entry.heroBackground.url.startsWith("http")
    ? entry.heroBackground.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${entry.heroBackground.url}`
  : null,
}
}


// lib/api.ts
 export async function getHomeServices() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-services?populate=image`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 120 }
    }
  )

  const json = await res.json()

  return json.data.map((entry: any) => ({
    label: entry.label,
    description: entry.description,
    image: entry.image?.url
      ? entry.image.url.startsWith("http")
        ? entry.image.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${entry.image.url}`
      : "/images/fallback.png", // fallback local
  }))
}


// lib/api.ts
export async function getContactSection() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!API_URL || !TOKEN) {
    console.error("❌ STRAPI URL ou TOKEN manquant dans .env");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/api/contact-section?populate=*`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("❌ Erreur HTTP Contact Section :", res.status);
      return null;
    }

    const json = await res.json();
    const item = json.data;

    if (!item) {
      console.warn("⚠️ Contact section vide.");
      return null;
    }

    return {
      phrase1: item.phrase1 ?? "",
      phrase2: item.phrase2 ?? "",
      titreFormulaire: item.titreFormulaire ?? "Contactez-nous",
      options: item.options ?? [],
      image: {
        url: item.image?.url ?? null, // ✅ Cloudinary URL déjà complète
      },
    };
  } catch (err) {
    console.error("❌ Erreur getContactSection :", err);
    return null;
  }
}



export async function getIntroLaSociete(): Promise<{ content: string[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/intro-la-societe`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 }
  });

  const json = await res.json();

  // Toujours retourner { content: string[] } 
  if (!json.data || !Array.isArray(json.data.content)) {
    return { content: [] };
  }

  return { content: json.data.content };
}

export async function getPoles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/poles?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 }
  })

  const json = await res.json()
  const rawPoles = json?.data
  if (!json.data) {
    console.warn("❗Pas de données reçues :", json);
    return []; // ou throw une erreur
  }

  if (!Array.isArray(rawPoles)) {
    console.warn("❌ Les pôles ne sont pas sous forme de tableau :", rawPoles)
    return []
  }

 return rawPoles
  .sort((a: any, b: any) => {
    const aOrdre = a.ordre ?? Infinity
    const bOrdre = b.ordre ?? Infinity
    return aOrdre - bOrdre
  })
  .map((item: any) => {
    const memojis = Array.isArray(item.memojis)
      ? item.memojis.map((img: any) =>
          img.url?.startsWith("http")
            ? img.url
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
        )
      : []

    return {
      title: item.title ?? "[Sans titre]",
      members: item.members ?? "",
      description: item.description ?? "",
      memojis,
    }
  })

}
export type PartnershipBlockType = {
  id: number
  title: string
  description: string
  images: string[]
  displayAsGreenTitle: boolean
}

export async function getPartnershipBlocks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partnership-blocks?populate=images`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 60 }
  });

  const json = await res.json();
  if (!json.data || !Array.isArray(json.data)) {
    console.warn("❗Pas de données reçues :", json);
    return [];
  }

  return json.data
    .map((item: any) => {
      const title = item.title ?? "";
      const description = item.description ?? "";
      const displayAsGreenTitle = item.displayAsGreenTitle === "oui";
      const images = Array.isArray(item.images)
        ? item.images.map((img: any) =>
            img.url?.startsWith("http")
              ? img.url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
          )
        : [];

      // Ajout de la ligne qui récupère ordre depuis attributes si besoin
      const order = item.ordre ?? item.attributes?.ordre ?? 999;

      return {
        id: item.id,
        title,
        description,
        images,
        displayAsGreenTitle,
        order,
      };
    })
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order);
}


export async function getLinkedinPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=images&sort=Date:desc&pagination[limit]=3`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const json = await res.json();


  return json.data
    .map((item: any) => {
      const imagesArray = Array.isArray(item.images)
        ? item.images
            .map((img: any) => {
              const url = img?.url;
              const mime = img?.mime;
              if (!url || !mime) return null;
              return {
                url: url.startsWith("http")
                  ? url
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`,
                mime,
              };
            })
            .filter(Boolean)
        : [];

      return {
        id: item.id,
        description: item.description,
        date: item.Date,
        images: imagesArray,
      };
    })
    .filter((post: any) => post.images.length > 0);

}



export interface Project {
  id: number
  title: string
  description: string
  image: string
}

export async function getProjects() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const res = await fetch(`${API_URL}/api/projects-cards?populate=image`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
      next: { revalidate: 60 }, // ✅ permet un cache de 60s
  });

  const json = await res.json();

  return json.data.map((item: any) => {
    const imageUrl = item.image?.formats?.medium?.url || item.image?.url;

    return {
      id: item.id,
      title: item.title ?? "",
      description: item.description ?? "",
      documentId: item.documentId ?? `missing-${item.id}`,
      image: imageUrl,
    };
  });
}


export async function getProjectById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects-cards/${id}?populate[gallery]=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    }
  )

  const json = await res.json()
  const data = json.data
  

  if (!data || !data.attributes) return null

  const attributes = data.attributes

  return {
    title: attributes.title,
    description: attributes.description,
    gallery:
      attributes.gallery?.data?.map(
        (img: any) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`
      ) ?? [],
  }
}


export async function getProjectByDocumentId(documentId: string) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";


  const res = await fetch(
    `${API_URL}/api/projects-cards?filters[documentId][$eq]=${documentId}&populate=gallery`
  );

  if (!res.ok) {
    console.error("Erreur API :", res.status);
    return null;
  }

  const data = await res.json();

  const item = data?.data?.[0];

  if (!item) {
    console.error("Projet introuvable.");
    return null;
  }

  return {
  id: item.id,
  title: item.title,
  description: item.description,
  documentId: item.documentId,
  gallery: (item.gallery || []).map((img: any) => ({
    url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
    name: img.name,
    alternativeText: img.alternativeText,
    caption: img.caption,
  })),
};
}



export async function getBrands() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const res = await fetch(
      `${API_URL}/api/section-marques?populate=*&pagination[limit]=100`, // ✅ Ajout du paramètre
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      throw new Error("Erreur API : " + res.status);
    }

    const data = await res.json();

    return data.data
      .sort((a: any, b: any) => {
        const aOrdre = a.ordre ?? Infinity;
        const bOrdre = b.ordre ?? Infinity;
        return aOrdre - bOrdre;
      })
      .map((brand: any) => ({
        id: brand.id,
        nom: brand.nom ?? "",
        logoNB:
          brand.logoNB?.url?.startsWith("http")
            ? brand.logoNB.url
            : brand.logoNB?.url
            ? `${API_URL}${brand.logoNB.url}`
            : brand.logoNB?.formats?.thumbnail?.url
            ? `${API_URL}${brand.logoNB.formats.thumbnail.url}`
            : "",

        logoCouleur:
          brand.logoCouleur?.url?.startsWith("http")
            ? brand.logoCouleur.url
            : brand.logoCouleur?.url
            ? `${API_URL}${brand.logoCouleur.url}`
            : brand.logoCouleur?.formats?.thumbnail?.url
            ? `${API_URL}${brand.logoCouleur.formats.thumbnail.url}`
            : "",

        lien: brand.lien ?? "",
      }));
  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function getServicesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services-page?populate[block][populate][card][populate]=image`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
        next: { revalidate: 60 }, // ✅ permet un cache de 60s
    }
  );

  const json = await res.json();
  return json.data; // 👈 enlève .attributes
}



// lib/api.ts
export async function getBrandsliste(): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/brand-slider`);
  const json = await res.json();

  // ✅ brandsString est directement dans json.data, pas dans attributes
  const brandsString = json.data?.brandsString ?? "";

  return brandsString.split(",").map((b: string) => b.trim());
}

export async function getProjectsSection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects-section?populate=*`
  );

  const json = await res.json();

  const data = json.data;

  if (!data) {
    throw new Error("❌ Aucun contenu reçu pour projects-section");
  }

  // Accès direct car il n'y a PAS de .attributes dans imageBackground
  const imageUrlDesktop = data.imageBackground?.url || null;
  const imageUrlMobile = data.imageBackgroundTelephone?.url || null;

  return {
    title: data.title,
    buttonText: data.buttonText,
    imageUrlDesktop,
    imageUrlMobile,
  };
}

export async function getPartnershipsSection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partnerships-section?populate=*`
  );
  const json = await res.json();

  const data = json.data;

  if (!data) {
    throw new Error("❌ Aucun contenu reçu pour partnerships-section");
  }

  const imageUrlDesktop = data.imageBackground?.url || null;
  const imageUrlMobile = data.imageBackgroundTelephone?.url || null;

  return {
    title: data.title,
    buttonText: data.buttonText,
    imageUrlDesktop,
    imageUrlMobile,
  };
}

export async function getFooter() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!API_URL || !token) {
    throw new Error("❌ NEXT_PUBLIC_STRAPI_URL ou API_TOKEN manquant");
  }

  const res = await fetch(`${API_URL}/api/footer?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
      next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error(`❌ Erreur Strapi footer : ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export async function getLegalText() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN!;

  const res = await fetch(
    `${API_URL}/api/footer?fields[0]=legalText`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 120 }, // ou tags si tu fais ISR + webhook plus tard
    }
  );

  if (!res.ok) {
    throw new Error(`❌ Erreur Strapi footer : ${res.status}`);
  }

  const json = await res.json();
  return json?.data?.legalText ?? "";
}


export async function getPartnershipIntro() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partnerships-intro`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  const json = await res.json();
  const data = json.data;

  return {
    description: data?.description || [],
  };
}

// app/api/project/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const documentId = searchParams.get("documentId")

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

  const res = await fetch(`${API_URL}/api/projects-cards?filters[documentId][$eq]=${documentId}&populate=gallery`)
  const data = await res.json()

  const item = data?.data?.[0]
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const gallery = (item.gallery || []).map((img: any) => ({
    url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
    name: img.name,
    alternativeText: img.alternativeText,
    caption: img.caption,
  }))

  return NextResponse.json({
    id: item.id,
    title: item.title,
    description: item.description,
    documentId: item.documentId,
    gallery,
  })
}