import Image from 'next/image'
import Link from 'next/link'

import { formatDate, getBlogPosts } from '@/lib/post'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

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
            className='mb-4 flex flex-col space-y-1'
            href={`/blog/${post.slug}`}
          >
            <div className='flex w-full flex-col space-x-0 md:flex-row md:space-x-2'>
              <div className='relative aspect-video w-full'>
                <Image
                  src={post.metadata.image || '/default-image.jpg'}
                  alt={post.metadata.title || 'No title'}
                  className='rounded-md object-cover'
                  fill
                />
              </div>

              <div>
                <p>{post.metadata.category}</p>
                <p className='tracking-tight text-neutral-900 dark:text-neutral-100'>
                  {post.metadata.title}
                </p>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                  {post.metadata.summary}
                </p>
                <p className='tabular-nums text-neutral-600 dark:text-neutral-400'>
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
