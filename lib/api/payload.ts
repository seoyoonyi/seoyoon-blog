const PAYLOAD_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}`)
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  if (data.docs.length > 0) {
    return data.docs[0]
  }
  return null
}
