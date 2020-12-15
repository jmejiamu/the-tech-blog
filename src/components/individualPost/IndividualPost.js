import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';

import restfulapi from '../URL/url';

import EditBlog from '../EditBlog';

const IndividualPost = (props) => {

    const [post, setPost] = useState([]);
    const [userName, setUserName] = useState("");
    const [userPicture, setUserPiture] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("")

    const getIndividualPost = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/allpost')
            const jsonData = await response.json()
            setPost(jsonData)
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async (id) => {
        try {
            const deleteData = await fetch(restfulapi.the_tech_blog + `/deleteblog/${id}`, {
                method: 'DELETE'
            })
            setPost(post.filter(userPost => userPost.id !== id))
            const data = await deleteData.json();
            toast.success(data.data)

        } catch (error) {
            console.error(error);
        }
    }

    const getUserData = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + '/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json();
            setUserEmail(data.email);
            setUserId(data.id)
            setUserName(data.name)
            setUserPiture(data.picture)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getIndividualPost();
        getUserData();
    }, [])

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={userName} id={userId} picture={userPicture} email={userEmail} />

            { post.length === 0 ? <h1 className="text-center mt-5 mb-5" >There is not post</h1> : (post.map(postData => {
                if (userEmail === postData.email) {

                    return (
                        <div className="card mb-5 container mt-5" key={postData.id} >
                            <div className="img-square-wrapper">
                                <img className="image-style" src={`${postData.picture}`} alt="Carcap" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{postData.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">@{postData.author}</h6>
                                <p className="card-text">{postData.context}</p>
                                <div className=" card-link btn-group">
                                    <EditBlog blog={postData} key={postData.id} />
                                </div>
                                <button
                                    type="button"
                                    className="button-style card-link btn btn-link"
                                    onClick={() => deletePost(postData.id)}
                                >Delete</button>
                            </div>
                        </div>
                    )
                }
            })
            )}
        </div>
    );
};

export default IndividualPost;