import React from 'react';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import logo from '../assets/logo.svg'
import logout from './loginLogout/logout';

const NavBar = (props) => {
    // console.log('this are props', props);

    // const logout = (e) => {

    //     e.preventDefault();
    //     localStorage.removeItem('jwt');
    //     props.setAuth(false);
    //     toast.success("👋 Logged out Successfully!")
    // }
    return (
        <div >
            <nav className=" navbar  navbar-expand-lg  justify-content-between navbar-dark bg-dark" >
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
                        {`Welcome ✌️ , ${props.name}`} </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#home">Edit Perfil</a>

                        <a className="dropdown-item" href="#home"
                            onClick={e => logout(e, props)}
                        >Sing Out</a>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavBar;