import React, { useEffect, useState } from 'react'

import EditBlog from './EditBlog';
import { getData } from './../action/getData';
import { connect } from 'react-redux';
import { deletePost } from './../action/deleteData';

const ShowAllBlogs = (props) => {
    const [blogData, setBlogData] = useState([]);

    // Delete
    // const deletePost = async (id) => {
    //     try {
    //         const deleteData = await fetch(`https://thetechblog.me/deleteblog/${id}`, {
    //             method: 'DELETE'
    //         })
    //         setBlogData(blogData.filter(blog => blog.id !== id))
    //     } catch (error) {
    //         console.error(error.message);

    //     }
    // }

    const getAllPost = async () => {
        try {
            const response = await fetch('https://thetechblog.me/allpost')
            const jsonData = await response.json()

            setBlogData(jsonData);
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        // getAllPost();
        getData();
    }, []);


    return (
        <div className="bg">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="text-center py-5 cl" >Blogs</h1>
                </div>
            </div>
            <hr />
            {
                props.show.length === 0 ? <h1 className="text-center mt-5 mb-5"> There is not post yet!{'😌'}</h1> : (props.show.map(blog => {

                    return (
                        <div className="card mb-5" key={blog.id} >
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{blog.author}</h6>
                                <p className="card-text">{blog.context}</p>
                                <div className=" card-link btn-group">
                                    <EditBlog blog={blog} />
                                </div>
                                {/* <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => props.dele(blog.id)}>Delete</button> */}
                            </div>
                        </div>
                    )

                })
                )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        show: state.showData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getData: dispatch(getData()),
    }
}
// const mapDispatchToProps = {

//     deletePost

// }
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllBlogs);
