import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCategories = () => {
  const { data, error } = useSWR('/api/categories', fetcher)

  const cleanCategories =
    data?.categories?.map((item) => ({
      dirName: item.category.toLowerCase(),
      publicName: item.category,
      count: item.count,
    })) || []

  return {
    categories: cleanCategories,
    isLoading: !error && !data,
    isError: !!error,
  }
}
