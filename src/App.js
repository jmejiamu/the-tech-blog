import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import restfulapi from './components/URL/url';


import '../src/components/style/styles.scss'

import ShowAllBlogs from './components/ShowAllBlogs';
import AddNewBlog from './components/AddNewbolg';
import Home from './components/Home';


import Login from './components/loginLogout/Login'
import Register from './components/loginLogout/Register';
import IndividualPost from './components/individualPost/IndividualPost';
import About from './components/about/About';
import Store from './components/store/Store';
import UserItemsList from './components/userItems/UserItemsList';

toast.configure();



function App() {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setAuthenticated(boolean);
    }

    const isAuth = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/isverify', {
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
                    <Route exact={true}
                        path='/'
                        render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/home" />} />
                    <Route exact path='/home' render={props => isAuthenticated ? <Home {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/all' render={props => isAuthenticated ? <ShowAllBlogs {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/add' render={props => isAuthenticated ? <AddNewBlog {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/post' render={props => isAuthenticated ? <IndividualPost {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/about' render={props => isAuthenticated ? <About {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/store' render={props => isAuthenticated ? <Store {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/items' render={props => isAuthenticated ? <UserItemsList {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
