'use client'

import { useEffect, useState } from 'react'
import { getViewsCount, incrementView } from 'queries/db'

type Props = {
  slug: string
}

export const ViewCount = ({ slug }: Props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchViewCount = async () => {
      await incrementView(slug)
      const views = await getViewsCount()
      const viewCount = views.find((view) => view.slug === slug)?.count || 0
      setCount(viewCount)
    }

    fetchViewCount()
  }, [slug])

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {count.toLocaleString()} views
    </p>
  )
}
