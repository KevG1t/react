
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filtersContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <FiltersProvider>
        <App />
    </FiltersProvider>
)
