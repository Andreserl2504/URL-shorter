import { useRef } from 'react'
import { useShorter } from '../hooks/useShorter'

export function ShortURL() {
  const { id, setInputValue, isError, isPending } = useShorter()
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
      <div className=' flex gap-32 h-screen justify-center flex-col'>
        <div className='w-screen flex justify-center'>
          <h1 className=' sm:text-6xl text-4xl font-extrabold font-monts text-center '>
            Make your URL{' '}
            <span className=' text-6xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
              shorter
            </span>
          </h1>
        </div>
        <div className=' font-rubik w-screen flex justify-center items-center flex-col gap-5'>
          <form className=' flex gap-3' onSubmit={(e) => handleSubmit(e)}>
            <input
              className=' bg-gray-200 p-2 rounded-md focus:outline-none'
              type='text'
              placeholder='Make an URL shorter'
              ref={inputURL}
            />
            <button className=' font-rubik px-5 py-2 rounded-md bg-blue-500 text-white'>
              Send
            </button>
          </form>
          <div className='min-h-10'>
            <div
              className={` top-20 flex items-center justify-center bg-slate-200 rounded-md shadow-slate-100 shadow-sm w-auto h-full`}
            >
              <span className=' sm:mx-10 mx-5 my-5 max-sm:text-sm font-rubik'>
                {!isError && id?.id && !isPending ? (
                  <a href={`${window.location + id.id}`}>{`${
                    window.location + id.id
                  }`}</a>
                ) : isPending && !isError ? (
                  <div
                    className='relative inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                    role='status'
                  >
                    <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] '>
                      Loading...
                    </span>
                  </div>
                ) : isError && !isPending ? (
                  'Something went wrong :('
                ) : (
                  'Your new URL here 😸😺'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
