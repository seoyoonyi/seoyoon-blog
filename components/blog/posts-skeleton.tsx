import React from 'react'

interface BlogPostsSkeletonProps {
  count?: number
}

const BlogPostsSkeleton = ({ count = 6 }: BlogPostsSkeletonProps) => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {[...Array(count)].map((_, index) => (
        <div key={index} className='flex animate-pulse flex-col'>
          <div className='relative mb-2.5 aspect-video w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700' />
          <div className='flex flex-1 flex-col space-y-2'>
            <div className='h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700' />
            <div className='h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700' />
            <div className='h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700' />
            <div className='h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogPostsSkeleton
