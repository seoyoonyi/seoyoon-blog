'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils/date-utils'

export function BlogPosts() {
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/blog-posts') 
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

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='flex flex-col mb-4 space-y-2 md:flex-row md:space-x-4'>
   
            <div className='w-full bg-gray-200 rounded-md aspect-video animate-pulse dark:bg-gray-700 md:w-1/3' />

  
            <div className='flex flex-col flex-1 space-y-2'>
              <div className='w-1/3 h-4 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700' />
              <div className='w-2/3 h-6 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700' />
              <div className='w-full h-4 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700' />
              <div className='w-1/4 h-4 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col mb-4 space-y-1 md:flex-row md:space-x-4'
            href={`/blog/${post.slug}`}
          >
            <div className='relative w-full overflow-hidden rounded-md aspect-video md:w-1/3'>
              <Image
                src={post.metadata.image || '/default-image.jpg'}
                alt={post.metadata.title || 'No title'}
                className='object-cover rounded-md'
                fill
              />
            </div>

            <div className='flex flex-col flex-1'>
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
