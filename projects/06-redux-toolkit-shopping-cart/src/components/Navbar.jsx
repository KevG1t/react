import { NavLink } from "react-router-dom"
import './navBar.css'
import { LogOut } from "./LogOut"
import {useSelector} from 'react-redux'
import { LogIn } from "./LogIn"

export function Navbar() {
    const {isAuth} = useSelector(state => state.auth)
    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? 'active': 'inactive'}>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/cart'} className={({isActive}) => isActive ? 'active': 'inactive'}>
                            Carrito
                        </NavLink>
                    </li>
                </ul>
                {isAuth ? <LogOut/>: <LogIn/>}
            </nav>
        </header>
    )
}