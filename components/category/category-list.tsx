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
import { useCategories } from '@/hooks/use-categories'

interface CategoryListProps {
  currentCategory?: string
}

const CategoryList = ({ currentCategory = 'all' }: CategoryListProps) => {
  const router = useRouter()
  const { categories, isLoading, isError } = useCategories()

  const categoryToURL = (category: string) => category.toLowerCase()

  const onCategoryChange = (value: string) => {
    router.push(value === 'all' ? '/' : `/blog/category/${categoryToURL(value)}`)
  }

  if (isLoading) {
    return <p>Loading categories...</p>
  }

  if (isError) {
    return <p>Failed to load categories. Please try again later.</p>
  }

  const allPostCount = categories.reduce(
    (total: number, category) => total + (category.count || 0),
    0
  )

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
            .filter((cg) => cg.category && cg.count)
            .map((cg) => (
              <CategoryButton
                key={`${cg.category}-${cg.count}`}
                href={`/blog/category/${categoryToURL(cg.category)}`}
                displayName={cg.category}
                isCurrent={currentCategory.toLowerCase() === cg.category.toLowerCase()}
                count={cg.count}
              />
            ))}
        </ul>
      </section>
      <section className='mb-10 sm:hidden'>
        <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key='all' value='all'>
              All ({allPostCount})
            </SelectItem>
            {categories
              .filter((cg) => cg.dirName && cg.count)
              .map((cg) => (
                <SelectItem key={`${cg.dirName}-${cg.count}`} value={cg.dirName}>
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
