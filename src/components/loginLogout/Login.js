import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitUserData = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email: email,
                password: password
            }

            const response = await fetch('https://thetechblog.me/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await response.json()
            console.log(data);

            if (data.token) {
                localStorage.setItem('jwt', data.token)

                props.setAuth(true)
                toast.success(" ✔️  Logged in")
            } else {
                props.setAuth(false);
                toast.error(` ❌ ${data.response}`)

            }

        } catch (error) {

        }

    }


    return (

        // 
        <div className="container-fluid">
            <div className="row no-gutter">

                <div className="col-md-6 d-none d-md-flex bg-image"></div>



                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">


                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Log in</h3>
                                    <p className="text-muted mb-4">Welcome to the the-tech-blog.</p>
                                    <form onSubmit={submitUserData} >
                                        <div className="form-group mb-3">
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                required=""
                                                className="form-control rounded-pill border-0 shadow-sm px-4"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />

                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                required=""
                                                className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />

                                        </div>

                                        <button type="submit"
                                            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                            onClick={submitUserData}
                                        >Sign in</button>
                                        <div className="text-center d-flex justify-content-between mt-4"><p>Dont have an account yet <Link to="/register" className="font-italic text-muted">
                                            <u>Register Here!</u></Link></p></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Login;