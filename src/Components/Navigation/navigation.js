import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { AuthAction } from '../../store/action/auth.action';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { DropdownToggle, Dropdown, DropdownMenu } from 'reactstrap';
const Navigation = (props) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleLogout = () => {
        props.removeSession();
        toggle();
        history.push('/');
    }

    const toggle = () => { setOpen(!open) }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <header style={{ background: "rgba(0,0,0,.7)" }} className="fixed-top">
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <NavLink className="navbar-brand text-white" to="/home">
                    <FontAwesomeIcon icon={faGithub} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="row collapse navbar-collapse " id="navbarSupportedContent">
                    <div className="col">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Most Popular
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="/popular">Popular</NavLink>
                                    <NavLink className="dropdown-item" to="/toprated">Top Rated</NavLink>
                                    <NavLink className="dropdown-item" to="/trending">Trending</NavLink>
                                    <div className="dropdown-divider"></div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/discover">Discover</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="col-xl-2 ml-4">
                        <ul className="navbar-nav mr-auto " >
                            <li className="navbar-brand">
                                <NavLink className="text-white-50" to="/search">
                                    <FontAwesomeIcon icon={faSearch} />
                                </NavLink>
                            </li>
                            <li className="navbar-brand">
                                <FontAwesomeIcon icon={faFacebook} />
                            </li>
                            <li className="navbar-brand">
                                <FontAwesomeIcon icon={faInstagram} />
                            </li>
                            <li className="navbar-brand">
                                <FontAwesomeIcon icon={faGithubSquare} />
                            </li>
                            <li className="navbar-brand">
                                <Dropdown isOpen={open} toggle={toggle}>
                                    <DropdownToggle caret style={{outline: 0}}>

                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <div className="card">
                                            <div className="card-header">{user.username}</div>
                                            <div className="card-body">
                                                <p>ID: {user.id}</p>
                                                <NavLink to={`/account/${user.id}`}>View Account</NavLink>
                                            </div>
                                            <div className="card-footer text-center">
                                                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                                            </div>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeSession: () => dispatch(AuthAction.deleteSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);