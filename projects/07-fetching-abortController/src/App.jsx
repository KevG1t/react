import { Character } from './components/Character.jsx'
import { Header } from './components/Header.jsx'
import { useFetch } from './hooks/useFetch.js'
import styles from './App.module.css'

const API_URL = 'https://rickandmortyapi.com/api/character'

const filterData = (data) => {
  return data?.reduce((prev, item) => {
    prev.push({
      ID: item.id,
      NAME: item.name,
      STATUS: item.status,
      IMAGE: item.image,
      TYPE: item.type
    })
    return prev
  }, [])
}

function App () {
  const { data, loading, error } = useFetch(API_URL)
  const filteredData = filterData(data?.results)
 
  return (
    <>
      <Header/>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error: {error}</h1>}
        <ul className={styles.list}>
          {filteredData?.map(item => {
            return (
            <li className={styles.listItem} key={item.ID}>
              <Character props={item}/>
            </li>
            )
          })}
        </ul>
    </>
  )
}

export default App
