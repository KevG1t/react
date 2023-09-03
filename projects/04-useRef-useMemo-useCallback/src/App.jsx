// import responseMovies from './mocks/withMovies.json'
import './App.css'
import { useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 300)
  , [getMovies]
  )

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // se pasa el search para no crear la funcion cada que escribimos
    getMovies({ search })
  }

  return (
   <div className='page'>
    <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} autoComplete='off' onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'/>
         <section className='sort-container'>
         <label for="sort" >Ordenar</label>
          <input id='sort' type="checkbox" onChange={handleSort} checked={sort}/>
         </section>
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
      <main>
      {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
   </div>
  )
}

export default App
