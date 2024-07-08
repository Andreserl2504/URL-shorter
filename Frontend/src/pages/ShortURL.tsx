import { useRef } from 'react'
import { useShorter } from '../hooks/useShorter'

export function ShortURL() {
  const { id, setInputValue, isError } = useShorter()
  const inputURL = useRef<HTMLInputElement | null>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { current: input } = inputURL
    if (input) {
      setInputValue(input.value)
    }
  }
  return (
    <>
      <div className=' w-screen h-screen flex justify-center items-center flex-col gap-5'>
        <form className=' flex gap-3' onSubmit={(e) => handleSubmit(e)}>
          <input
            className=' bg-gray-200 p-2 rounded-md focus:outline-none'
            type='text'
            placeholder='Make an URL shorter'
            ref={inputURL}
          />
          <button className=' px-5 py-2 rounded-md bg-blue-500 text-white'>
            Send
          </button>
        </form>
        <div
          className={` bg-slate-200 rounded-md shadow-slate-100 shadow-sm max-w-md h-10`}
        >
          <span>
            {!isError && id?.id
              ? `${window.location + id.id}`
              : isError
              ? "Something went wrong :'("
              : ''}
          </span>
        </div>
      </div>
    </>
  )
}
