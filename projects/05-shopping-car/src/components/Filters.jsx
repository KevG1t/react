import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'
useFilters

export function Filters () {
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const {filters, setFilters} = useFilters()

    //por separado
    // const handleChangeMinPrice = (event) => {
    //     const inputValue = event.target.value
    //     setFilters(prevState => ({...prevState, minPrice:inputValue}))
    // }
    // const handleChangeCategory = (event) => {
    //     const inputValue = event.target.value
    //     setFilters(prevState => ({...prevState, category:inputValue}))
    // }

    //una sola funcion para ambos
    const handleChange = (event) => {
        const input = event.target.name
        const value = event.target.value
        setFilters(prevState => ({...prevState,[input]:value}))
    }
    
    return (
        <section className='filters'>

        <div>
          <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
          <input
            name='minPrice'
            type='range'
            id={minPriceFilterId}
            min='0'
            max='1000'
            onChange={handleChange}
            value={filters.minPrice}
          />
          <span>${filters.minPrice}</span>
        </div>
  
        <div>
          <label htmlFor={categoryFilterId}>Categoría</label>
          <select name='category' id={categoryFilterId} onChange={handleChange}>
            <option value='all'>Todas</option>
            <option value='laptops'>Portátiles</option>
            <option value='smartphones'>Celulares</option>
          </select>
        </div>
  
      </section>
    )
}