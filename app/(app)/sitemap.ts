import { getBlogPosts } from '@/lib/api/mdx'

export const baseUrl = 'https://www.seoyoonyi.com'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['/', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
