import React, { useState } from "react";
// import { withRouter } from 'react-router-dom';

const AddNewBlog = props => {
    const [titleblog, setTitleBlog] = useState("");
    const [authorBlog, setAuthorBlog] = useState("");
    const [contextBlog, setContextBlog] = useState("");
    const [alertValidation, setAlertValidation] = useState({
        show: false,
        message: ""
    });
    const submitData = async e => {
        e.preventDefault();

        if (titleblog === "" && authorBlog === "" && contextBlog === "") {
            setAlertValidation({
                show: true,
                message:
                    "The inputs are empty"
            });
        } else {
            if (titleblog !== "") {
                if (authorBlog !== "") {
                    if (contextBlog !== "") {
                        // Send the data to the DB
                        try {
                            const body = {
                                title: titleblog,
                                author: authorBlog,
                                context: contextBlog
                            };
                            const response = await fetch("https://thetechblog.me/newpost", {
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
                } else {
                    setAlertValidation({
                        show: true,
                        message:
                            "The inputs are empty"
                    });
                }
            } else {
                setAlertValidation({
                    show: true,
                    message:
                        "The inputs are empty"
                });
            }
        }
    };

    return (
        <div className="bg">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="text-center py-5 cl" >Add New Blog</h1>
                </div>
            </div>
            <form className="mt-5 mb-5 bx-con" onSubmit={submitData}>
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        value={authorBlog}
                        onChange={e => setAuthorBlog(e.target.value)}
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
                {/* <div className="text-center"> */}
                <button className="btn btn-success">Add Blog</button>
                {/* </div> */}
            </form>
            {alertValidation.show ? (
                <div className="alert alert-danger">
                    <strong>Try again!</strong> {alertValidation.message}
                </div>
            ) : (
                    ""
                )}
        </div>
    );
};

export default AddNewBlog;