'use client'

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
  const router = useRouter()

  if (isLoading) {
    return <p>Loading categories...</p>
  }

  if (isError) {
    return <p>Failed to load categories. Please try again later.</p>
  }

  // Calculate the total count of posts within the component
  const allPostCount = categories.reduce((total, category) => total + (category.count || 0), 0)

  return (
    <>
      <section className='mb-10 hidden sm:block'>
        <ul className='flex gap-3'>
          <CategoryButton
            href='/'
            isCurrent={currentCategory.toLowerCase() === 'all'}
            displayName='All'
            count={allPostCount}
          />
          {categories
            .filter((cg) => cg) // null 또는 undefined 제거
            .map((cg) => (
              <CategoryButton
                key={cg.dirName}
                href={`/category/${categoryToURL(cg.dirName)}`}
                displayName={cg.publicName}
                isCurrent={currentCategory.toLowerCase() === cg.dirName.toLowerCase()}
                count={cg.count}
              />
            ))}
        </ul>
      </section>
      <section className='mb-10 sm:hidden'>
        <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key='all' value='all'>
              All ({allPostCount})
            </SelectItem>
            {categories
              .filter((cg) => cg)
              .map((cg) => (
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
