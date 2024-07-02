import { useRef } from 'react'

function App() {
  const inputURL = useRef<HTMLInputElement | null>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { current: input } = inputURL
    console.log(input?.value)
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
        <span>this is your URL</span>
      </div>
    </>
  )
}

export default App
