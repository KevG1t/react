import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  const previousSearch = useRef(search)// valor mutable que persiste entre renders

  // useCallback --> useMemo pero para funciones
  // elimina la necesidad de crear el callback usado con useMemo
  // por debajo usa useMemo
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // calculos que se realizan en funcion de las dependencias de useMemo
  // asi evitamos realizar grandes calculos cuando no son necesarios
  const sortedMovies = useMemo(() => {
    return sort && movies
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, getMovies }
}
