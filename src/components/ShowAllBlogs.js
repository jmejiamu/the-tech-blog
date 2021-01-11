import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import restfulapi from './URL/url'


import NavBar from './NavBar';
import Comments from './comments/Comments';

import ReadMoreReact from 'read-more-react';



const ShowAllBlogs = (props) => {
    const [blogData, setBlogData] = useState([]);
    const [userName, setUserName] = useState("");
    const [userPicture, setUserPiture] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("")
    // Delete
    const deletePost = async (id) => {
        try {
            const deleteData = await fetch(restfulapi.the_tech_blog + `/deleteblog/${id}`, {
                method: 'DELETE'
            })
            setBlogData(blogData.filter(blog => blog.id !== id))
            const dataResponse = await deleteData.json();
            toast.success(dataResponse.data)
        } catch (error) {
            console.error(error.message);

        }
    }

    const getAllPost = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/allpost')
            const jsonData = await response.json()

            setBlogData(jsonData);
        } catch (error) {
            console.error(error);

        }
    }

    const getUserName = async () => {
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
        getAllPost();
        getUserName();
    }, []);


    return (
        <div className="body">

            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />
            <hr />
            {
                blogData.length === 0 ? <h1 className="text-center mt-5 mb-5"> There is not post yet!{'😌'}</h1> : (blogData.map(blog => {

                    return (
                        <div className="card mb-5 container " key={blog.id} >
                            <div className="img-square-wrapper">
                                <img className="image-style" src={`${blog.picture}`} alt="Carcap" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">@{blog.author}</h6>

                                <ReadMoreReact className="card-text"
                                    text={blog.context}
                                    max={500}
                                    ideal={450}
                                    min={400}
                                    readMoreText="Read More ..."
                                />

                                <div className=" card-link btn-group">
                                    <Comments blog={blog} key={blog.id} />
                                </div>
                            </div>
                        </div>
                    )

                })
                )}
        </div>
    )
}

export default ShowAllBlogs;
