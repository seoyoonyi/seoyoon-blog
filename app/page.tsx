'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import CategoryList from '@/components/category/category-list'
import { BlogPosts } from '@/components/posts'
import { CategoryDetail } from '@/config/types'
import { useCategories } from '@/hooks/use-categories'

export default function Page() {
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const router = useRouter()
  const { categories: categoryList } = useCategories()

  const categoryToURL = (category: string) => category.toLowerCase()

  const onCategoryChange = (category: string) => {
    setCurrentCategory(category)
    router.push(category === 'all' ? '/' : `category/${categoryToURL(category)}`)
  }

  return (
    <section>
      <CategoryList
        categories={categoryList}
        onCategoryChange={onCategoryChange}
        currentCategory={currentCategory}
      />
      <BlogPosts currentCategory={currentCategory} />
    </section>
  )
}
