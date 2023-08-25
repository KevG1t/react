import { useEffect, useState } from 'react'

export function useFetch (url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // creamos un controlador
    const abortController = new AbortController()
    setLoading(true)

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
    // si cambia de pestaña o cierra ventana se aborta la peticion
    return () => abortController.abort()
  }, [url])

  return { data, loading, error }
}
