import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const payload = await getPayloadClient()

    let whereConditions: any = {
      status: {
        equals: 'published',
      },
    }

    if (category && category !== 'all') {
      const categoryData = await payload.find({
        collection: 'categories',
        where: {
          slug: {
            equals: category,
          },
        },
        limit: 1,
      })

      if (categoryData.docs.length > 0) {
        whereConditions = {
          and: [
            whereConditions,
            {
              category: {
                equals: categoryData.docs[0].id,
              },
            },
          ],
        }
      }
    }

    const posts = await payload.find({
      collection: 'posts',
      where: whereConditions,
      sort: '-publishedAt',
      depth: 1,
    })

    const formattedPosts = posts.docs.map((post: any) => ({
      slug: post.slug,
      metadata: {
        title: post.title,
        publishedAt: post.publishedAt,
        summary: post.excerpt,
        image: post.thumbnail?.url || '/default-image.jpg',
        category: post.category?.name || 'Uncategorized',
      },
    }))

    return NextResponse.json({
      success: true,
      data: formattedPosts,
      total: posts.totalDocs,
    })
  } catch (error) {
    console.error('Blog posts API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
