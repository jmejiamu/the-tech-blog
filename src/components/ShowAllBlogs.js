import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
// import './style/card.scss'

import EditBlog from './EditBlog';
import NavBar from './NavBar';
// import { getData } from './../action/getData';
// import { connect } from 'react-redux';
// import { deletePost } from './../action/deleteData';

const ShowAllBlogs = (props) => {
    const [blogData, setBlogData] = useState([]);
    const [userName, setUserName] = useState("");
    // Delete
    const deletePost = async (id) => {
        try {
            const deleteData = await fetch(`https://thetechblog.me/deleteblog/${id}`, {
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
            const response = await fetch('https://thetechblog.me/allpost')
            const jsonData = await response.json()

            setBlogData(jsonData);
        } catch (error) {
            console.error(error);

        }
    }

    const getUserName = async () => {
        try {
            const response = await fetch('https://thetechblog.me/data', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })
            const data = await response.json()
            setUserName(data.name)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getAllPost();
        getUserName();
        // getData();
    }, []);


    return (
        <div className="body">
            {/* <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="text-center py-5 cl" >Blogs</h1>
                </div>
            </div> */}
            <NavBar setAuth={props.setAuth} name={userName} />
            <hr />
            {
                blogData.length === 0 ? <h1 className="text-center mt-5 mb-5"> There is not post yet!{'😌'}</h1> : (blogData.map(blog => {

                    return (
                        <div className="card mb-5 container " key={blog.id} >
                            <div class="img-square-wrapper">
                                <img className="image-style" src="http://via.placeholder.com/100x100" alt="Carcap" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{blog.author}</h6>
                                <p className="card-text">{blog.context}</p>
                                <div className=" card-link btn-group">
                                    <EditBlog blog={blog} key={blog.id} />
                                </div>
                                <button
                                    type="button"
                                    className="button-style card-link btn btn-link"
                                    onClick={() => deletePost(blog.id)}>Delete</button>
                            </div>
                        </div>
                    )

                })
                )}
        </div>
    )
}
// const mapStateToProps = (state) => {
//     return {
//         show: state.showData
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getData: dispatch(getData()),
//     }
// }
// const mapDispatchToProps = {

//     deletePost

// }
export default ShowAllBlogs;
