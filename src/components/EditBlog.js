import React, { useState } from 'react';

import { toast } from 'react-toastify';

import restfulapi from './URL/url'


const EditBlog = (props) => {

    const [titleblog, setTitleBlog] = useState(props.blog.title);
    const [authorBlog, setAuthorBlog] = useState(props.blog.author);
    const [contextBlog, setContextBlog] = useState(props.blog.context);


    const updateDataBlog = async () => {
        // e.preventDefault();

        try {
            // const id = props.blog.id;
            const body = {
                title: titleblog,
                author: authorBlog,
                context: contextBlog
            };
            const response = await fetch(restfulapi.the_tech_blog + `/updateblog/${props.blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const responseData = await response.json();

            console.log(responseData);
            toast.success(responseData.data, { autoClose: 15000 });

            window.location = "/all"

        } catch (error) {
            console.log(error.message);

        }





    }


    return (
        <div>

            <button
                type="button"
                className="button-style btn btn-link "
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

                            >Edit</button>

                            <button type="button" className="button-style btn btn-link" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default EditBlog;
