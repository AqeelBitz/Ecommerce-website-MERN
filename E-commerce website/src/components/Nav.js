import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div className='nav-link'>
        <img className='logo' src={logo} alt="logo" height={40} width={40} />
            {
                auth ?
                    <ul className='nav-ul'>
                        <li><Link to='/' >Products</Link></li>
                        <li><Link to='/add' >Add-Product</Link></li>
                        <li><Link to='/profile' >Profile</Link></li>
                        <li><Link to='/login' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul  className='nav-ul nav-right'>
                        <li><Link to='/signup' >Signup</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav