import { BlogPage } from '@/components/blog-page'
import { getPayloadClient } from '@/lib/payload'

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params
  const payload = await getPayloadClient()

  const categoriesData = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: categorySlug,
      },
    },
    limit: 1,
  })

  if (!categoriesData.docs.length) {
    return <div>Category not found</div>
  }

  const category = categoriesData.docs[0]

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          category: {
            equals: category.id,
          },
        },
      ],
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

  const allCategories = await payload.find({
    collection: 'categories',
    depth: 0,
  })

  const allPostsForCount = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 1,
    limit: 1000,
  })

  const categoryCounts = allPostsForCount.docs.reduce((acc, post) => {
    const categoryName = (post.category as any).name
    acc[categoryName] = (acc[categoryName] || 0) + 1
    return acc
  }, {})

  const formattedCategories = allCategories.docs.map((category: any) => ({
    dirName: category.slug,
    publicName: category.name,
    count: categoryCounts[category.name] || 0,
  }))

  return (
    <BlogPage
      posts={formattedPosts}
      categories={formattedCategories}
      initialCategory={categorySlug}
    />
  )
}
