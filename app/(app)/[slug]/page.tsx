import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { baseUrl } from '@/app/(app)/sitemap'
import { PostClient } from '@/components/blog/PostClient'
import { getPostBySlug } from '@/lib/api/payload'

// Force dynamic rendering for individual posts
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const post = await getPostBySlug(slug, isDraftMode)
  if (!post) {
    return
  }

  const { title, publishedAt: publishedTime, excerpt: description, thumbnail } = post
  const ogImage =
    typeof thumbnail === 'object' && thumbnail !== null && 'url' in thumbnail
      ? thumbnail.url
      : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  console.log(`Blog component: isDraftMode = ${isDraftMode}, slug = ${slug}`)
  const post = await getPostBySlug(slug, isDraftMode)

  if (!post) {
    notFound()
  }

  return <PostClient post={post} isDraftMode={isDraftMode} />
}
