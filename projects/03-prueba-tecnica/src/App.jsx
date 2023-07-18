import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import { OtherImage } from './components/OtherImage'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
        <h1>APP DE GATITOS</h1>
        <button onClick={handleClick}>Get new Fact</button>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first rhee words for ${fact}`} />}

        <OtherImage/>
    </main>
  )
}
