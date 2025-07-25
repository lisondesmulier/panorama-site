export function timeAgo(date: string): string {
  const now = new Date()
  const published = new Date(date)
  const diff = Math.floor((now.getTime() - published.getTime()) / 1000)

  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)

  if (days > 0) return `il y a ${days} jour${days > 1 ? "s" : ""}`
  if (hours > 0) return `il y a ${hours}h`
  return "il y a quelques minutes"
}
