import { useEffect, useState } from 'react'

export default function useFetch(fn, deps = []) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    queueMicrotask(() => {
      if (mounted) setLoading(true)
    })
    fn()
      .then((res) => mounted && setData(res))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, deps)

  return { data, loading, error }
}
