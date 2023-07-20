function ListOfMovies ({ movies }) {
  return (
          <ul className='movies'>
          {
            movies.map(movie => (
              <li className='movie' key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.img} alt={movie.Title} />
              </li>
            ))
          }
        </ul>
  )
}

function NoMoviesResult () {
  return (<h3>No se encontraron peliculas</h3>)
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies}/>
      : <NoMoviesResult/>
  )
}
