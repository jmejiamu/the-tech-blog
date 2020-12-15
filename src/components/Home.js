import React, { useEffect, useState } from 'react'
import FooterBar from './FooterBar';
import NavBar from './NavBar';

import restfulapi from './URL/url'

const Home = (props) => {
    // console.log(props);

    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPicture, setUserPiture] = useState("")

    const getUserName = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json();
            // pass the id
            // console.log(data);
            setUserName(data.name)
            setUserId(data.id)
            setUserPiture(data.picture)
            setUserEmail(data.email)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getUserName();
    }, [])

    return (
        <>
            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />
            <header className="masthead">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 text-cente">
                            <h1 className="text-center font-weight-light">Welcome to the Tech-Blog!</h1>
                            <p className="text-center lead">All about Technology.</p>
                        </div>
                    </div>
                </div>

            </header>


            <FooterBar />
        </>
    )
}

export default Home;
