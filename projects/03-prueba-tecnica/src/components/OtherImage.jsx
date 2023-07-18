import { useCatImage } from '../hooks/useCatImage.js'

export function OtherImage () {
  const { imageUrl } = useCatImage({ fact: 'cat' })

  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
