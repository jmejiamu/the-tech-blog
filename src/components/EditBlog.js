import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { deletePost } from './../action/deleteData';
// import { updatePost } from './../action/updatePost';
// import { editOpen } from './../action/editOpen';
import { toast } from 'react-toastify';


const EditBlog = (props) => {

    const [titleblog, setTitleBlog] = useState(props.blog.title);
    const [authorBlog, setAuthorBlog] = useState(props.blog.author);
    const [contextBlog, setContextBlog] = useState(props.blog.context);

    // Update Request
    const updateDataBlog = async () => {
        // e.preventDefault();

        try {
            // const id = props.blog.id;
            const body = {
                title: titleblog,
                author: authorBlog,
                context: contextBlog
            };
            const response = await fetch(`https://thetechblog.me/updateblog/${props.blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const responseData = await response.json();

            console.log(responseData);
            toast.success(responseData.data, { autoClose: 15000 });
            // props.updatePost(id, body)

            window.location = "/all"

        } catch (error) {
            console.log(error.message);

        }
        // console.log('>>>>>>>>>', props)




    }

    // const editpost = (id) => {
    //     props.editOpen(id)
    // }

    // const deleteItem = () => {
    //     const id = props.blog.id;
    //     props.deletePost(id)
    // }

    return (
        <div>

            <button
                type="button"
                className="button-style btn btn-link "
                data-toggle="modal"
                data-target={`#id${props.blog.id}`}>
                Edit</button>

            {/* <button
                type="button"
                className="card-link btn btn btn-danger mx-3"
                onClick={() => deleteItem()}>Delete</button> */}

            <div className="modal" id={`id${props.blog.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Edit Post</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={titleblog}
                                onChange={e => setTitleBlog(e.target.value)} />
                            <label>Author</label>
                            <input
                                type="text"
                                className="form-control"
                                value={authorBlog}
                                onChange={e => setAuthorBlog(e.target.value)} />
                            <label>Context</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={contextBlog}
                                onChange={e => setContextBlog(e.target.value)}></textarea>
                        </div>


                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="button-style btn btn-link"
                                data-dismiss="modal"
                                onClick={() => updateDataBlog()}
                            // onSubmit={updateDataBlog}
                            >Edit</button>

                            <button type="button" className="button-style btn btn-link" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

// const mapDispatchToProps = { deletePost, updatePost, editOpen }

export default EditBlog;
