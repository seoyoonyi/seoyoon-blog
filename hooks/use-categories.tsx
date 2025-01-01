import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useCategories = () => {
  const { data, error } = useSWR('/api/categories', fetcher)

  return {
    categories: data?.categories || [],
    isLoading: !error && !data,
    isError: !!error,
  }
}
