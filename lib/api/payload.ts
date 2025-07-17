const PAYLOAD_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL

export async function getPostBySlug(slug: string, isDraftMode = false) {
  const draftQuery = isDraftMode ? '&draft=true' : ''
  const fetchUrl = `${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}${draftQuery}`

  const res = await fetch(fetchUrl)

  if (!res.ok) {
    console.error(`Failed to fetch post: ${res.status} ${res.statusText}`)
    return null
  }
  const data = await res.json()

  if (data.docs.length > 0) {
    return data.docs[0]
  }
  return null
}
