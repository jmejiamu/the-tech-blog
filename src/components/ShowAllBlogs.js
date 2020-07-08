import React, { useEffect, useState } from 'react'

import EditBlog from './EditBlog';

const ShowAllBlogs = () => {
    const [blogData, setBlogData] = useState([]);

    // Delete
    const deletePost = async (id) => {
        try {
            const deleteData = await fetch(`https://thetechblog.me/deleteblog/${id}`, {
                method: 'DELETE'
            })
            setBlogData(blogData.filter(blog => blog.id !== id))
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
    useEffect(() => {
        getAllPost();
    }, []);

    console.log(blogData);

    return (
        <div>
            <h1 className="text-center mt-5" >All Blogs</h1>

            <hr />
            {blogData.length === 0 ? <h1 className="text-center mt-5 mb-5"> There is not post yet!{'😌'}</h1> : (blogData.map(blog => {
                return (
                    <div className="card mb-5" key={blog.id} >
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{blog.author}</h6>
                            <p className="card-text">{blog.context}</p>
                            <div className=" card-link btn-group">
                                <EditBlog blog={blog} />
                            </div>
                            <button
                                type="button"
                                className="card-link btn btn btn-danger"
                                onClick={() => deletePost(blog.id)}>Delete</button>
                        </div>
                    </div>
                )

            })
            )}
        </div>
    )
}

export default ShowAllBlogs;
