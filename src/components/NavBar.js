import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-dark" >
                <a className="navbar text-white " href="/">
                    <img src={logo} width="35" height="35" alt="logo" />
                    the-Tech-Blog
                </a>

                <ul className="navbar-nav" >
                    <li className="nav-item"><Link className="nav-link " to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/all">Blogs</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/add">Add Blog</Link></li>
                </ul>

            </nav>
        </div>

    )
}

export default NavBar;