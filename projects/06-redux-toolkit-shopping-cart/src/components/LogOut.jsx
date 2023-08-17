import { useDispatch } from 'react-redux'
import { logout } from "../features/auth/authSlice"

export function LogOut() {
    const dispatch = useDispatch()
    const handleClick = () => dispatch(logout())
    return (
        <button style={{ 
            width: '100px', 
            height: '25px', 
            background: '#999',
            border:'none',
            borderRadius:'8px',
            color:'#fef' 
        }} onClick={handleClick}>Log Out</button>
    )
}