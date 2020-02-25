import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { AuthAction } from '../../store/action/auth.action';

const Auth = (props) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {

        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Login"
    })

    const handleChange = (event) => {
        event.target.id === "username" ? setUserName(event.target.value) : setPassword(event.target.value);
    }
    const handleLogin = (event) => {
        event.preventDefault();
        let user = {
            username: username,
            password: password
        };

        setIsSubmit(true);

        props.authSession(user);
    }

    const handleKeyDown = event => {
        if(event.keyCode === 13 && username && password) {
            document.getElementById("submit").click();
        }
    }

    return (
        <div className="container-fluid h-100 position-relative">
            <div className="login-container">
                <div className="row">
                    <div className="d-flex justify-content-center" style={{ background: "rgba(0,0,0,.7)" }}>
                        <form >
                            <div className="form-group" style={{ height: "14px" }}>
                                <h3 className="form-text text-white text-center">LOGIN</h3>
                            </div>
                            <div className="form-group">
                                <label className="text-white-50">Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={handleChange} onKeyDown={handleKeyDown}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label className="text-white-50">Password</label>
                                <input type="password" className="form-control" id="password" onChange={handleChange} onKeyDown={handleKeyDown}/>
                            </div>
                            <div className="form-group" style={{ height: "3px" }}>
                                {
                                    isSubmit ?
                                        <span>
                                            {
                                                props.isAuth ? <p className="text-danger">Username or password incorrect</p> : <p></p>
                                            }
                                        </span> :
                                        <span></span>
                                }
                            </div>
                            <div className="text-center mt-4">
                                <button id="submit" onClick={handleLogin} type="button" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { isAuth, isSuccess } = state.auth;
    return {
        isAuth,
        isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authSession: (user) => dispatch(AuthAction.authSession(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
