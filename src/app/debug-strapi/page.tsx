// src/app/debug-strapi/page.tsx

export default async function DebugStrapi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/partnership-blocks?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    cache: "no-store", // pour ne pas avoir de cache
  })

  const json = await res.json()

  return (
    <pre className="text-sm whitespace-pre-wrap p-4">
      {JSON.stringify(json, null, 2)}
    </pre>
  )
}
