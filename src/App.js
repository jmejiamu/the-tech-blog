import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//- components
import NavBar from './components/NavBar';
import ShowAllBlogs from './components/ShowAllBlogs';
import AddNewBlog from './components/AddNewbolg';
import Home from './components/Home';
import FooterBar from './components/FooterBar';


function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/all' component={ShowAllBlogs} />
                    <Route exact path='/add' component={AddNewBlog} />
                </Switch>
                <FooterBar />
            </div>
        </BrowserRouter>
    );
}

export default App;
