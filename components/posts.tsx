'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import BlogPostsSkeleton from '@/components/blog/posts-skeleton'
import { Metadata } from '@/config/types'
import { formatDate } from '@/lib/utils/date-utils'

interface BlogPostsProps {
  currentCategory: string
}

interface BlogPost {
  slug: string
  metadata: Metadata
}

export function BlogPosts({ currentCategory }: BlogPostsProps) {
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/blog-posts')
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`)
        }
        const blogs = await response.json()
        setAllBlogs(blogs)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredBlogs = allBlogs
    .filter((blog) => {
      const date = new Date(blog.metadata.publishedAt)
      const isValidDate = blog.metadata.publishedAt && !isNaN(date.getTime())

      const isMatchingCategory =
        currentCategory.toLowerCase() === 'all' ||
        blog.metadata.category.toLowerCase() === currentCategory.toLowerCase()

      return isValidDate && isMatchingCategory
    })
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime()
      const dateB = new Date(b.metadata.publishedAt).getTime()
      return dateB - dateA
    })

  if (isLoading) {
    return <BlogPostsSkeleton count={9} />
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {filteredBlogs.map((post) => (
        <Link key={post.slug} className='flex flex-col' href={`/${post.slug}`}>
          <div className='relative mb-2.5 aspect-video w-full overflow-hidden rounded-md'>
            <Image
              src={post.metadata.image || '/default-image.jpg'}
              alt={post.metadata.title || 'No title'}
              className='rounded-md object-cover'
              fill
            />
          </div>

          <div className='flex flex-1 flex-col'>
            <p className='text-sm font-bold text-neutral-600 dark:text-neutral-400'>
              {post.metadata.category}
            </p>
            <p className='mb-2.5 text-2xl font-semibold text-neutral-900 dark:text-neutral-100'>
              {post.metadata.title}
            </p>
            <p className='mb-2.5 text-sm text-neutral-600 dark:text-neutral-400'>
              {post.metadata.summary}
            </p>
            <p className='text-xs text-neutral-500 dark:text-neutral-400'>
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
