import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import logout from './loginLogout/logout';
import restfulapi from './URL/url'
import { useHistory } from 'react-router-dom';


const NavBar = (props) => {
    // console.log('This are props', props);
    // props  - name and id
    const history = useHistory();


    const handleGoToPost = () => {
        history.push('/post')
    }

    const [pictureResource, setPictureResource] = useState({ preview: "", raw: "" });
    const [userName, setName] = useState('')
    const updateProfileData = () => {

        try {
            const formData = new FormData();
            formData.append("name", props.name);
            formData.append("email", props.email);
            formData.append("photo", pictureResource.raw);

            const response = fetch(restfulapi.the_tech_blog + `/updateprofilepicture/${props.id}`, {
                method: "PUT",
                body: formData
            })
        } catch (error) {
            console.error(error.message);
        }

    }

    const onFileChange = (e) => {
        if (e.target.files.length) {
            setPictureResource({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
        }
    }

    return (
        <div >
            <nav className=" navbar  navbar-expand-lg  justify-content-between navbar-dark bg-dark" >
                <a className=" logo-style navbar text-white " href="/">
                    <img src={logo} width="35" height="35" alt="logo" />
                    the-Tech-Blog
                </a>

                <ul className="navbar-nav" >
                    <li className="nav-item"><Link className="nav-link " to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/all">Blogs</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/add">Add Blog</Link></li>
                </ul>

                <div className="dropdown">
                    <button className="drop-down-style btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {`Welcome ✌️ , ${props.name}`} </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#home"
                            data-toggle="modal"
                            data-target={`#id${props.id}`}
                        >Edit Perfil</a>

                        <a className="dropdown-item" href="#home"
                            onClick={e => logout(e, props)}
                        >Sing Out</a>
                    </div>
                </div>
            </nav>
            <div className="modal" id={`id${props.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title">Edit Profile</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <label htmlFor="upload-button" >
                            {pictureResource.preview ? (
                                <img src={pictureResource.preview} className="image-style" alt="upload-pic-view" />) :
                                (
                                    <img className="image-style" src={`${props.picture}`} alt="Carcap" />
                                )

                            }
                        </label>

                        <div className="modal-body">

                            <p> <strong>Name: </strong> {props.name}</p>
                            <div>
                                <button
                                    type="submit"
                                    className="button-style btn btn-link"
                                    data-dismiss="modal"
                                    onClick={handleGoToPost}
                                >Manage post</button>

                            </div>


                            <input className="my-3"
                                type="file"
                                name="file"
                                onChange={onFileChange}
                            />

                        </div>


                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="button-style btn btn-link"
                                data-dismiss="modal"
                                onClick={() => updateProfileData()}

                            >Edit</button>

                            <button type="button" className="button-style btn btn-link" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default NavBar;