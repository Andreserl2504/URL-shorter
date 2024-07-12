import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Snag } from 'snag-query'

export function useFetchURL() {
  const { id } = useParams()
  const urlBackend = import.meta.env.VITE_BACK_URL
  const snag = new Snag({ URL: urlBackend })
  const {
    data: original_url,
    isLoading,
    isError
  } = useQuery<{ original_url: string }>({
    queryKey: [id],
    queryFn: async () => {
      return snag.getSnag<{ original_url: string }>({ path: `/${id}` }).data
    }
  })
  return {
    original_url,
    isLoading,
    isError
  }
}
