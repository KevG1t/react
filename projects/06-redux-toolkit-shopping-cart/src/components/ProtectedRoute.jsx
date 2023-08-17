import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'

export function ProtectedRoute ({children}) {
    const {isAuth} = useSelector(state => state.auth)
    const location = useLocation()
    if (!isAuth) {
        return <Navigate to={'/login'} state={{location}}/>
    }
    return children
  }