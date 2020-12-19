import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

import restfulapi from './URL/url';

const AddNewBlog = props => {
    const [userId, setUserId] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [picture, setPicture] = useState("")
    const [userName, setUserName] = useState("");
    const [titleblog, setTitleBlog] = useState("");
    const [authorBlog, setAuthorBlog] = useState("");
    const [contextBlog, setContextBlog] = useState("");
    const [alertValidation, setAlertValidation] = useState({
        show: false,
        message: ""
    });
    const submitData = async e => {
        e.preventDefault();

        if (titleblog === "" && contextBlog === "") {
            setAlertValidation({
                show: true,
                message:
                    "The inputs are empty"
            });
        } else {
            if (titleblog !== "") {
                // if (authorBlog !== "") {
                if (contextBlog !== "") {
                    // Send the data to the DB
                    try {
                        const body = {
                            title: titleblog,
                            author: userName,
                            context: contextBlog,
                            email: userEmail,
                            picture: picture
                        };
                        const response = await fetch(restfulapi.the_tech_blog + "/newpost", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });

                    } catch (error) {
                        console.error(error.message);
                    }

                    props.history.push("/all");
                } else {
                    setAlertValidation({
                        show: true,
                        message:
                            "The inputs are empty"
                    });
                }
                // } else {
                //     setAlertValidation({
                //         show: true,
                //         message:
                //             "The inputs are empty"
                //     });
                // }
            } else {
                setAlertValidation({
                    show: true,
                    message:
                        "The inputs are empty"
                });
            }
        }
    };
    const getUserName = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json()
            setUserName(data.name)
            setUserEmail(data.email)
            setPicture(data.picture)
            setUserId(data.id)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getUserName();
    }, [])

    return (
        <div>

            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={picture} email={userEmail} />
            <div className="container" >

                <form className="add-post-form mt-5 mb-5 bx-con" onSubmit={submitData}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={titleblog}
                            onChange={e => setTitleBlog(e.target.value)}
                        />
                    </div>


                    <div className="form-group">
                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="Description"
                            value={contextBlog}
                            onChange={e => setContextBlog(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success">Add Blog</button>

                </form>
                {alertValidation.show ? (
                    <div className="alert alert-danger">
                        <strong>Try again!</strong> {alertValidation.message}
                    </div>
                ) : (
                        ""
                    )}
            </div>
        </div>
    );
};

export default AddNewBlog;