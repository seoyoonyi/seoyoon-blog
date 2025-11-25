import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <article className='md:mx-auto md:max-w-[750px]'>
      <section className='mb-10'>
        {/* Title skeleton */}
        <Skeleton className='mb-2 h-8 w-3/4' />

        {/* Date and view count skeleton */}
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-20' />
        </div>

        {/* Content skeleton */}
        <section className='prose dark:prose-invert'>
          <div className='space-y-3'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />

            <div className='py-4'>
              <Skeleton className='h-6 w-2/3' />
            </div>

            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />

            <div className='py-4'>
              <Skeleton className='h-6 w-1/2' />
            </div>

            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
          </div>
        </section>
      </section>

      {/* Comments section skeleton */}
      <div className='mt-12 space-y-4'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-24 w-full' />
      </div>
    </article>
  )
}
