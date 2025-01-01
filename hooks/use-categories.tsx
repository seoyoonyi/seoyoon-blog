import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCategories = () => {
  const { data, error } = useSWR('/api/categories', fetcher)

  const cleanCategories = data?.categories?.filter((category) => typeof category === 'string') || []

  return {
    categories: cleanCategories,
    isLoading: !error && !data,
    isError: !!error,
  }
}
