import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Snag } from 'snag-query'

export function useShorter() {
  const [inputValue, setInputValue] = useState<string>('')
  const snag = new Snag({ URL: 'http://localhost:3000' })
  const snagMutatation = snag.mutateSnag<{ id: string }>({ path: '/create' })
  const { data: id, mutate } = useMutation<{ id: string }>({
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
    console.log(bool)
    if (bool) {
      mutate()
      console.log('hi')
    }
  },[inputValue, mutate])

  return { id, setInputValue }
}