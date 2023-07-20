const API_KEY = '8e95b4a8'

function mapedMovies (data) {
  const movies = data.Search
  return movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    img: movie.Poster
  }))
}

export async function searchMovies ({ search }) {
  if (search === '') return null
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()
    return mapedMovies(json)
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
