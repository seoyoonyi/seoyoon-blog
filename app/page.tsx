import { BlogPosts } from '@/components/posts'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <section>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  )
}
