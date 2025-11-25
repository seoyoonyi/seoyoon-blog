import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'

// Use React cache to dedupe requests within the same render
// This prevents duplicate calls in generateMetadata and page component
export const getPostBySlug = cache(async (slug: string, isDraftMode = false) => {
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
})

// Cached version for published posts (not draft mode)
// Use shorter revalidation time to reflect changes faster
export const getCachedPostBySlug = (slug: string) => {
  return unstable_cache(
    async () => getPostBySlug(slug, false),
    [`post-by-slug-${slug}`],
    {
      tags: [`post-${slug}`],
      revalidate: 60, // Revalidate every 1 minute instead of 1 hour
    },
  )()
}
