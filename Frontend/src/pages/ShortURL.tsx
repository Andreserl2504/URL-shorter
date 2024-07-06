import { useRef } from 'react'
import { useShorter } from '../hooks/useShorter'

export function ShortURL() {
  const { id, setInputValue } = useShorter()
  const inputURL = useRef<HTMLInputElement | null>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { current: input } = inputURL
    if (input) {
      setInputValue(input.value)
    } else {
      console.log('aksdjl')
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' placeholder='Make an URL shorter' ref={inputURL} />
        <button>Send</button>
      </form>
      <div
        className={` bg-slate-200 rounded-md shadow-slate-100 shadow-sm max-w-md h-10`}
      >
        <span>{id?.id ? `${window.location + id.id}` : ''}</span>
      </div>
    </>
  )
}
