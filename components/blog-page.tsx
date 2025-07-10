'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import CategoryList from '@/components/category/category-list'
import { BlogPosts } from '@/components/posts'
import { CategoryDetail } from '@/config/types'

export function BlogPage({ posts, categories, initialCategory = 'all' }: { posts: any[]; categories: CategoryDetail[], initialCategory?: string }) {
  const [currentCategory, setCurrentCategory] = useState<string>(initialCategory)
  const router = useRouter()

  const categoryToURL = (category: string) => category.toLowerCase()

  const onCategoryChange = (category: string) => {
    setCurrentCategory(category)
    router.push(category === 'all' ? '/' : `/category/${categoryToURL(category)}`)
  }

  return (
    <section>
      <CategoryList
        categories={categories}
        onCategoryChange={onCategoryChange}
        currentCategory={currentCategory}
      />
      <BlogPosts currentCategory={currentCategory} allBlogs={posts} />
    </section>
  )
}
