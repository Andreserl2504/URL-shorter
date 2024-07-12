import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Snag } from 'snag-query'

export function useShorter() {
  const [inputValue, setInputValue] = useState<string>('')
  const urlBackend = import.meta.env.VITE_BACK_URL
  const snag = new Snag({ URL: urlBackend })
  const snagMutatation = snag.mutateSnag<{ id?: string }>({
    path: '/create'
  })
  const {
    data: id,
    mutate,
    isError,
    isPending,
  } = useMutation<{ id?: string }>({
    mutationFn: async () => {
      if (snagMutatation) {
        const data = snagMutatation.mutate({ body: { url: inputValue } })
        return data
      }
      throw new Error('Somesthing went wrong :,(')
    }
  })

  useEffect(() => {
    const bool = !!inputValue
    if (bool) {
      mutate()
    }
  }, [inputValue, mutate])

  return { id, setInputValue, isError, isPending }
}
