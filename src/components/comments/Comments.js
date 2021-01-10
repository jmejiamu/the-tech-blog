import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import restfulapi from '../URL/url'


const Comments = (props) => {


    // const [titleblog, setTitleBlog] = useState(props.blog.title);
    // const [authorBlog, setAuthorBlog] = useState(props.blog.author);
    const [comments, setAddComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [userId, setUserId] = useState("")
    const [userEmail, setUserEmail] = useState("");
    const [picture, setPicture] = useState("")
    const [userName, setUserName] = useState("");


    const addComment = async (e) => {
        e.preventDefault();

        try {
            // const id = props.blog.id;
            const body = {
                comments: comments,
                newblog_id: props.blog.id,
                username: userName,
                useremail: userEmail
            };
            const response = await fetch(restfulapi.the_tech_blog + `/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const responseData = await response.json();


            toast.success(responseData.data, { autoClose: 15000 });

            // window.location = "/all"
            getAllComments();
            setAddComment('');

        } catch (error) {
            console.log(error.message);

        }


    }

    const getAllComments = async () => {
        try {
            const response = await fetch(restfulapi.the_tech_blog + `/allcomments`)
            const dataResponse = await response.json();

            setAllComments(dataResponse);
        } catch (error) {
            console.error(error.message);
        }
    }

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
        getAllComments();
        getUserName();
    }, [])


    return (
        <div>

            <button
                type="button"
                className="button-style btn btn-link "
                data-toggle="modal"
                data-target={`#id${props.blog.id}`}>
                comment</button>



            <div className="modal" id={`id${props.blog.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Comments</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            {
                                allComments.map(comment => {
                                    if (props.blog.id === comment.newblog_id) {
                                        return (
                                            <div key={comment.id} >
                                                <p className="username">{comment.username}</p>
                                                <p>{comment.comments}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>


                        <div className="modal-footer">
                            <textarea
                                type="text"
                                className="form-control input-comment"
                                placeholder="Add comment"
                                value={comments}
                                onChange={e => setAddComment(e.target.value)}></textarea>
                            <button
                                type="submit"
                                className="button-style btn btn-link"
                                // data-dismiss="modal"
                                onClick={addComment}

                            >Add</button>

                            <button type="button" className="button-style btn btn-link" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}


export default Comments;
