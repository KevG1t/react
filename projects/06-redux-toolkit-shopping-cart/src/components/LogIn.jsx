import { useDispatch } from 'react-redux'
import { login } from "../features/auth/authSlice"
import { useNavigate, useLocation} from 'react-router-dom'

export function LogIn() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {state} = useLocation()

    const handleClick = () => {
        dispatch(login())
        navigate(state?.location?.pathname ?? '/')
    }
    
    return (
        <button style={{ 
            width: '100px', 
            height: '25px', 
            background: '#999',
            border:'none',
            borderRadius:'8px',
            color:'#fef' 
        }} onClick={handleClick}>Login</button>
    )
}