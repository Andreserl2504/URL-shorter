import { useQuery } from '@tanstack/react-query'
import { Snag } from 'snag-query'

export function useShorter() {
  const snag = new Snag({})
  const {
    data: url,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['url'],
    queryFn: async () => {}
  })
  return {
    url,
    isError,
    isLoading
  }
}
