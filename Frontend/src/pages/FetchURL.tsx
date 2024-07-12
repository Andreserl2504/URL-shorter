import { Link } from 'react-router-dom'
import { useFetchURL } from '../hooks/useFetchURL'

export function FetchURL() {
  const { original_url: url, isLoading, isError } = useFetchURL()
  console.log(url)
  return (
    <>
      <div className=' absolute left-5 top-5'>
        <Link to={'/'}>
          <button className=' font-rubik bg-blue-500 text-white px-5 py-2 rounded-md shadow-sm shadow-blue-500'>
            Return to home page
          </button>
        </Link>
      </div>
      <div className=' h-screen w-screen flex justify-center items-center'>
        <div>
          {url && !isLoading && !isError ? (
            <>
              <meta http-equiv="Refresh" content={`0; url='${url.original_url}'`} />
            </>
          ) : isLoading && !isError ? (
            <div
              className='text-blue-500 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
              role='status'
            >
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
          ) : (
            isError &&
            !isLoading && (
              <span className=' font-rubik bg-red-500 text-white px-5 py-2 rounded-md shadow-sm shadow-red-400'>{`Something went wrong :'(`}</span>
            )
          )}
        </div>
      </div>
    </>
  )
}
