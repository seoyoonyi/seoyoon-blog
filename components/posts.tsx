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
    <div className='flex flex-col gap-2'>
      {filteredBlogs.map((post) => (
        <div key={post.slug} className='flex items-baseline gap-4'>
          {/* 날짜 */}
          <time className='shrink-0 text-sm text-neutral-500 dark:text-neutral-400'>
            {(post.metadata as any).publishedAt
              ? formatDate((post.metadata as any).publishedAt)
              : '날짜 정보 없음'}
          </time>

          {/* 제목 */}
          <Link
            href={`/${post.slug}`}
            className='underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300'
          >
            {post.metadata.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
