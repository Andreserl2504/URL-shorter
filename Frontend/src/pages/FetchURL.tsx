import { Link } from 'react-router-dom'
import { useFetchURL } from '../hooks/useFetchURL'

export function FetchURL() {
  const { url, isLoading, isError } = useFetchURL()
  return (
    <>
      <Link to={'/'}>
        <button>return to home page</button>
      </Link>
      <div> hi</div>
      {url && !isLoading && !isError && (
        <>
          <meta http-equiv="Refresh" content={`0; url='${url.url}'`} />
        </>
      )}
    </>
  )
}
