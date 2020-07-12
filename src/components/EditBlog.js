import React, { useState } from 'react';


const EditBlog = (props) => {

    const [titleblog, setTitleBlog] = useState(props.blog.title);
    const [authorBlog, setAuthorBlog] = useState(props.blog.author);
    const [contextBlog, setContextBlog] = useState(props.blog.context);

    // Update Request
    const updateDataBlog = async (e) => {
        // e.preventDefault();
        try {
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

            // window.location = "/all"


        } catch (error) {
            console.log(error.message);

        }
        // console.log('>>>>>>>>>', props)

        window.location = "/all"


    }

    return (
        <div>

            <button
                type="button"
                className="btn btn-warning "
                data-toggle="modal"
                data-target={`#id${props.blog.id}`}>
                Edit</button>


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
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateDataBlog(e.target.value)}>Edit</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditBlog;
