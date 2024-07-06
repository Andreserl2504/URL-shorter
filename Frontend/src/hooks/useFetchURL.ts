import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Snag } from 'snag-query'

export function useFetchURL() {
  const { id } = useParams()
  const snag = new Snag({ URL: 'http://localhost:3000' })
  const {
    data: url,
    isLoading,
    isError
  } = useQuery<{ url: string }>({
    queryKey: [id],
    queryFn: async () => {
      return snag.getSnag<{ url: string }>({ path: `/${id}` }).data
    }
  })
  return {
    url,
    isLoading,
    isError
  }
}
