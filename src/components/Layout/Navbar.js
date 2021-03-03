import React from 'react'
import {Link} from "react-router-dom"
import {useAuth} from '../../contexts/authContext'
import {useHistory} from 'react-router-dom'

function Navbar() {
    const {auth, handleLogout} = useAuth()
    const history = useHistory()

    let authBar = !auth ? 
    (<nav className="nav">
        <ul className="nav__list">
            <li className="nav__item">
                <Link to="/signup" className="nav__link">
                    Registracija
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/login" className="nav__link"> 
                    Prijava
                </Link>
            </li>
        </ul>
    </nav>) : 
    (
    <nav className="nav">
        <ul className="nav__list">
            <Link to="/login" className="nav__link" onClick={() => handleLogout(history)}>
                Odjava
            </Link>
        </ul>
    </nav>
    ) 

    return authBar
}

export default Navbar