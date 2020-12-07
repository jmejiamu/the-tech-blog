import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

const NavBar = () => {
    return (
        <div >
            <nav className=" navbar sticky-top navbar-expand-lg  justify-content-between navbar-dark bg-dark" >
                <a className=" logo-style navbar text-white " href="/">
                    <img src={logo} width="35" height="35" alt="logo" />
                    the-Tech-Blog
                </a>

                <ul className="navbar-nav" >
                    <li className="nav-item"><Link className="nav-link " to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/all">Blogs</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/add">Add Blog</Link></li>
                </ul>

                <div className="dropdown">
                    <button className="drop-down-style btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        User Name </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Edit Perfil</a>
                        <a className="dropdown-item" href="#">Sing Out</a>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavBar;