export function formatImageUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  return url;
}
