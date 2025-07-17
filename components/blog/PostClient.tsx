'use client'

import { useEffect, useState } from 'react'
import { Suspense } from 'react'

import { RichText } from '@/components/RichText'
import BlogComments from '@/components/blog/blog-comments'
import { ViewCount } from '@/components/view-count'
import { formatDate } from '@/lib/utils/date-utils'

export const PostClient = ({ post: initialPost, isDraftMode }) => {
  const [post, setPost] = useState(initialPost)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = event.data
        if (data.type === 'payload-live-preview' && data.doc) {
          setPost(data.doc)
        }
      } catch (error) {
        console.error('Error handling postMessage:', error)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <article className='md:mx-auto md:max-w-[750px]'>
      <section className='mb-10'>
        <h1 className='title text-2xl font-semibold tracking-tighter'>{post.title}</h1>
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(post.publishedAt)}
          </p>
          {!isDraftMode && (
            <Suspense>
              <ViewCount slug={post.slug} />
            </Suspense>
          )}
        </div>

        <section className='prose dark:prose-invert'>
          <RichText content={post.content} />
        </section>
      </section>

      <BlogComments />
    </article>
  )
}
