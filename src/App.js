import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import '../src/components/style/styles.scss'

//- components
import NavBar from './components/NavBar';
import ShowAllBlogs from './components/ShowAllBlogs';
import AddNewBlog from './components/AddNewbolg';
import Home from './components/Home';
// import FooterBar from './components/FooterBar';


toast.configure();

function App() {
    return (
        <BrowserRouter>
            <div className="body" >
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/all' component={ShowAllBlogs} />
                    <Route exact path='/add' component={AddNewBlog} />
                </Switch>
                {/* <FooterBar /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
