import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  const payload = await getPayloadClient()

  // Get ALL posts (including drafts, no status filter)
  const allPosts = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-id',
  })

  return NextResponse.json({
    total: allPosts.totalDocs,
    posts: allPosts.docs.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status,
      publishedAt: post.publishedAt,
    })),
  })
}
