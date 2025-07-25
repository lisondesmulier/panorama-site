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
