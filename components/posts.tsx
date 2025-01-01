'use client'

import { use, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/lib/utils/date-utils'

interface BlogPostsProps {
  currentCategory: string
}

export function BlogPosts({ currentCategory }: BlogPostsProps) {
  const [allBlogs, setAllBlogs] = useState<any[]>([])
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

  useEffect(() => {
    console.log('Current Category:', currentCategory)
  }, [])

  const filteredBlogs = allBlogs
    .filter((blog) => {
      const date = new Date(blog.metadata.publishedAt)
      const isValidDate = blog.metadata.publishedAt && !isNaN(date.getTime())

      const isMatchingCategory =
        currentCategory.toLowerCase() === 'all' ||
        blog.metadata.category.toLowerCase() === currentCategory.toLowerCase()

      console.log('Filtering Blog:', {
        title: blog.metadata.title,
        isValidDate,
        isMatchingCategory,
      })

      return isValidDate && isMatchingCategory
    })
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime()
      const dateB = new Date(b.metadata.publishedAt).getTime()
      return dateB - dateA
    })

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='mb-4 flex flex-col space-y-2 md:flex-row md:space-x-4'>
            <div className='aspect-video w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 md:w-1/3' />
            <div className='flex flex-1 flex-col space-y-2'>
              <div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700' />
              <div className='h-6 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700' />
              <div className='h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700' />
              <div className='h-4 w-1/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {filteredBlogs.map((post) => (
        <Link
          key={post.slug}
          className='mb-4 flex flex-col space-y-1 md:flex-row md:space-x-4'
          href={`/blog/${post.slug}`}
        >
          <div className='relative aspect-video w-full overflow-hidden rounded-md md:w-1/3'>
            <Image
              src={post.metadata.image || '/default-image.jpg'}
              alt={post.metadata.title || 'No title'}
              className='rounded-md object-cover'
              fill
            />
          </div>

          <div className='flex flex-1 flex-col'>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              {post.metadata.category}
            </p>
            <p className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
              {post.metadata.title}
            </p>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
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
