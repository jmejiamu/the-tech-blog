import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import '../src/components/style/styles.scss'

//- components
import ShowAllBlogs from './components/ShowAllBlogs';
import AddNewBlog from './components/AddNewbolg';
import Home from './components/Home';
// import FooterBar from './components/FooterBar';

import Login from './components/loginLogout/Login'
import Register from './components/loginLogout/Register';

toast.configure();



function App() {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setAuthenticated(boolean);
    }

    const isAuth = async () => {
        try {
            const response = await fetch('http://localhost:3001/isverify', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json()
            data === true ? setAuthenticated(true) : setAuthenticated(false)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, [])

    return (
        <BrowserRouter>
            <div className="body" >
                <Switch>
                    {/* Log in */}
                    <Route exact={true}
                        path='/'
                        render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/home" />} />
                    <Route exact path='/home' render={props => isAuthenticated ? <Home {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/all' render={props => isAuthenticated ? <ShowAllBlogs {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/add' render={props => isAuthenticated ? <AddNewBlog {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
