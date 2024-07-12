import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Snag } from 'snag-query'

export function useFetchURL() {
  const { id } = useParams()
  const urlBackend = import.meta.env.BACK_URL
  const snag = new Snag({ URL: urlBackend })
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
