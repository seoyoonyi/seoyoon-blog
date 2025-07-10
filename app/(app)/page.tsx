import { BlogPage } from '@/components/blog-page'
import { getPayloadClient } from '@/lib/payload'

export default async function Page() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
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

  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
  })

  const categoryCounts = formattedPosts.reduce((acc, post) => {
    const categoryName = post.metadata.category
    acc[categoryName] = (acc[categoryName] || 0) + 1
    return acc
  }, {})

  const formattedCategories = categories.docs.map((category: any) => ({
    dirName: category.slug,
    publicName: category.name,
    count: categoryCounts[category.name] || 0,
  }))

  return <BlogPage posts={formattedPosts} categories={formattedCategories} />
}
