import { getPayloadClient } from '@/lib/payload'

export async function getPostBySlug(slug: string, isDraftMode = false) {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: isDraftMode,
      limit: 1,
    })

    if (result.docs.length > 0) {
      return result.docs[0]
    }
    return null
  } catch (error) {
    console.error(`Failed to fetch post with slug "${slug}":`, error)
    return null
  }
}
