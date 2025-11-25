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
export const getCachedPostBySlug = unstable_cache(
  async (slug: string) => getPostBySlug(slug, false),
  ['post-by-slug'],
  {
    tags: [`post-${slug}`],
    revalidate: 3600, // Revalidate every hour
  },
)
