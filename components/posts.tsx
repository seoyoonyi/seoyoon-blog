'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Metadata } from '@/config/types'
import { formatDate } from '@/lib/utils/date-utils'

interface BlogPostsProps {
  currentCategory: string
  allBlogs: BlogPost[]
}

interface BlogPost {
  slug: string
  metadata: Metadata
}

export function BlogPosts({ currentCategory, allBlogs }: BlogPostsProps) {
  if (!allBlogs || allBlogs.length === 0) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <p className='mb-2 text-lg text-gray-500'>데이터가 없습니다.</p>
          <p className='text-sm text-gray-400'>블로그 글을 추가해보세요.</p>
        </div>
      </div>
    )
  }

  const filteredBlogs = allBlogs
    .filter((blog) => {
      if (!blog || !blog.metadata) {
        console.log('Invalid blog structure:', blog)
        return false
      }

      const metadata = blog.metadata as any
      const publishedDate = metadata.publishedAt || metadata.date || metadata.createdAt

      console.log('Date check for blog:', {
        title: metadata.title,
        publishedAt: metadata.publishedAt,
        hasPublishedAt: !!metadata.publishedAt,
        publishedAtType: typeof metadata.publishedAt,
        publishedAtValue: metadata.publishedAt,
      })

      const date = new Date(publishedDate || new Date())
      const isValidDate = true
      const isMatchingCategory =
        currentCategory.toLowerCase() === 'all' ||
        (metadata.category && metadata.category.toLowerCase() === currentCategory.toLowerCase())

      console.log('Filter results:', {
        title: metadata.title,
        category: metadata.category,
        publishedDate,
        isValidDate,
        isMatchingCategory,
        passed: isValidDate && isMatchingCategory,
      })

      return isValidDate && isMatchingCategory
    })
    .sort((a, b) => {
      const dateA = new Date((a.metadata as any).publishedAt || (a.metadata as any).date).getTime()
      const dateB = new Date((b.metadata as any).publishedAt || (b.metadata as any).date).getTime()
      return dateB - dateA
    })

  console.log('Final filtered blogs:', filteredBlogs.length)

  if (filteredBlogs.length === 0) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <p className='mb-2 text-lg text-gray-500'>
            {currentCategory === 'all'
              ? '게시글이 없습니다.'
              : `"${currentCategory}" 카테고리에 글이 없습니다.`}
          </p>
          <p className='text-sm text-gray-400'>
            {currentCategory === 'all'
              ? '첫 번째 글을 작성해보세요!'
              : '다른 카테고리를 선택해보세요.'}
          </p>

          <details className='mt-4 text-xs text-gray-400'>
            <summary>디버그 정보</summary>
            <div className='mt-2 space-y-1'>
              <p>현재 카테고리: {currentCategory}</p>
              <p>전체 글 수: {allBlogs.length}</p>
              <p>첫 번째 글: {JSON.stringify(allBlogs[0], null, 2)}</p>
            </div>
          </details>
        </div>
      </div>
    )
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
              {(post.metadata as any).publishedAt
                ? formatDate((post.metadata as any).publishedAt)
                : '날짜 정보 없음'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
