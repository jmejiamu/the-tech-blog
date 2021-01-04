import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import restfulapi from '../URL/url';


const About = (props) => {

    const [userName, setUserName] = useState("")
    const [userPicture, setUserPiture] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState("")
    const getUserData = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json();
            setUserName(data.name);
            setUserPiture(data.picture);
            setUserEmail(data.email);
            setUserId(data.id);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div>
            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />
            <div className="container">
                <h1 className="mt-5" >About the Tech Blog</h1>
                <h2 className="mt-5">Jose H Mejia Munoz</h2>
                <p>He graduted in Spring 2020 from City College of San Francisco.
                He got an Associate of Science degree in Computer Networking and Information Technology focused in Cyber Security;
                also, he got a certificate in Network Security.
                Now, he is working towards earning a Bachelor of Science in Computer Science at San Francisco State University.
                <br />
                He enjoy coding and learning new technologies; therefore, he built the Tech Blog as a personal project,
                but now, he wanted it to be open source.
                    </p>

                <h2>Contributors</h2>
                <h6>Jose H Mejia Munoz</h6>
                <a href="https://github.com/jmejiamu" target="_blank" >GitHub</a>

            </div>
        </div>
    );
};

export default About;