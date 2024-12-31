import { getMDXData } from '@/lib/utils/file-utils'
import path from 'path'

export const getBlogPosts = () => {
  const postsDir = path.join(process.cwd(), 'posts')
  return getMDXData(postsDir)
}
