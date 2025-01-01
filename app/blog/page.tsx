'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import CategoryList from '@/components/category/category-list'
import { BlogPosts } from '@/components/posts'
import { useCategories } from '@/hooks/use-categories'

export default function Page() {
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const { categories: categoryList } = useCategories()
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
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>My Blog</h1>
      <CategoryList
        categories={categoryList} // Corrected prop name to 'categories'
        onCategoryChange={onCategoryChange}
        currentCategory={currentCategory}
      />
      <BlogPosts currentCategory={currentCategory} />
    </section>
  )
}
