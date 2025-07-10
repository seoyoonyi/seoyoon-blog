export interface Metadata {
  category: string
  title: string
  publishedAt: string
  summary: string
  image?: string
}
export interface CategoryDetail {
  dirName: string
  publicName: string
  count: number
}

export interface Category {
  name: string
  slug: string
}
