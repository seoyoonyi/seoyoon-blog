import { NextResponse } from 'next/server'

import { getCategoryList } from '@/lib/utils/file-utils'
import path from 'path'

export async function GET() {
  try {
    const mdxDir = path.join(process.cwd(), 'posts')
    const categories = getCategoryList(mdxDir)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
