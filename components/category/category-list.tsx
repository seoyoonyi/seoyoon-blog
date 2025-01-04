'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { CategoryButton } from '@/components/category/category-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CategoryDetail } from '@/config/types'

interface CategoryListProps {
  categories: CategoryDetail[]
  isLoading?: boolean
  isError?: boolean
  currentCategory?: string
  onCategoryChange: (value: string) => void
}

const categoryToURL = (category: string) => category.toLowerCase()

const CategoryList = ({
  categories,
  isLoading,
  isError,
  currentCategory = 'all',
  onCategoryChange,
}: CategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory)

  useEffect(() => {
    setSelectedCategory(currentCategory)
  }, [currentCategory])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onCategoryChange(value)
  }

  if (isLoading) {
    return <p>Loading categories...</p>
  }

  if (isError) {
    return <p>Failed to load categories. Please try again later.</p>
  }

  const allPostCount = categories.reduce((total, category) => total + (category.count || 0), 0)

  return (
    <>
      <section className='mb-8 hidden sm:block'>
        <ul className='flex gap-3'>
          <CategoryButton
            href='/'
            isCurrent={selectedCategory.toLowerCase() === 'all'}
            displayName='All'
            count={allPostCount}
          />
          {categories.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/category/${categoryToURL(cg.dirName)}`}
              displayName={cg.publicName}
              isCurrent={selectedCategory.toLowerCase() === cg.dirName.toLowerCase()}
              count={cg.count}
            />
          ))}
        </ul>
      </section>
      <section className='mb-8 sm:hidden'>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key='all' value='all'>
              All ({allPostCount})
            </SelectItem>
            {categories.map((cg) => (
              <SelectItem key={cg.dirName} value={cg.dirName}>
                {cg.publicName} ({cg.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  )
}

export default CategoryList
