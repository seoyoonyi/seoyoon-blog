'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import CategoryList from '@/components/category/category-list'
import { BlogPosts } from '@/components/posts'
import { CategoryDetail } from '@/config/types'

interface CategoryPageProps {
  categoryList: CategoryDetail[]
  allPostCount: number
}

export default function CategoryPage({ categoryList, allPostCount }: CategoryPageProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const pathSegments = pathname.split('/')
    const category = pathSegments[pathSegments.length - 1] || 'all'
    setCurrentCategory(category)
    console.log('URL-based Current Category:', category)
  }, [pathname])

  const categoryToURL = (category: string) => category.toLowerCase()

  const onCategoryChange = (category: string) => {
    setCurrentCategory(category)
    router.push(category === 'all' ? '/' : `/blog/category/${categoryToURL(category)}`)
  }

  return (
    <section>
      <div className='my-8'>
        <CategoryList />
        <BlogPosts currentCategory={currentCategory} />
      </div>
    </section>
  )
}
