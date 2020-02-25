import React, { useState } from 'react';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../Page/Loading/loading';

import { userAction } from '../../../store/action/user.action';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import helper from '../../../helper/helper';

import { Tooltip, Button, Modal } from 'reactstrap';

const queryString = require('querystring');
/*const useFetch = (actionCreator, count) => {
    useEffect(() => {
        actionCreator()
    }, [actionCreator, count]);
}*/


const CreatedLists = props => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [count, setCount] = useState(0);

    const handleWaitResult = (ms) => {
        setTimeout(() => {
            setCount(count + 1);
        }, ms)
    }

    //useFetch(props.getCreatedLists, count);

    const [, lists,] = helper.useFetching(
        process.env.REACT_APP_API_URL + `/account/${JSON.parse(localStorage.getItem('user')).id}/lists?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: JSON.parse(localStorage.getItem('sessionId')).session_id
        })}`
        , count);


    const handleModal = () => {
        setModal(!modal);
    }

    const handleChange = event => {
        event.target.id === 'name' ? setName(event.target.value) : setDescription(event.target.value);
    }

    const handleCreate = (event) => {
        event.preventDefault();

        const list = {
            name: name,
            description: description,
            language: "en"
        }

        props.createList(list);

        handleWaitResult(600);

        setModal(!modal);

    }

    if (modal) {
        return <div className="container-fluid h-100 position-relative">
            <div className="menu-overlay" style={{ width: '100%' }}>
                <button className="closebtn" onClick={handleModal}><FontAwesomeIcon icon={faTimes} /></button>
                <div className="menu-overlay-content">
                    <div className="content">
                        <label style={{ color: '#fff', fontSize: '.9em', fontWeight: 'bold' }}>Name</label>
                        <input id="name" placeholder="New List" className="border-0" onChange={handleChange} autoFocus="autofocus" />
                        <label style={{ color: '#fff', fontSize: '.9em', fontWeight: 'bold' }}>Description</label>
                        <input id="description" placeholder="Description" onChange={handleChange} className="border-0" />
                    </div>
                </div>
                <div className="mofooter">
                    <button className="btn btn-cancel" onClick={handleModal}>Cancel</button>
                    <button className="btn btn-green-extra ml-3" onClick={handleCreate}>Create</button>
                </div>
            </div>

        </div>
    } else {
        if (lists) {
            return <div className="container-fluid h-100 position-relative" style={{ backgroundColor: 'rgba(20,20,5,.7)' }}>
                <div className="container position-absolute text-center" style={{ top: "30%", left: "50%", transform: 'translate(-50%, -50%)' }}>
                    <div className="row">
                        <div className="col-lg-2 col-sm-2 text-left ml-4">
                            <button id="createlist" type="button" onClick={handleModal} className="btn btn-primary" title="Create List">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row flex-wrap mr-auto justify-content-center mt-3">
                            {
                                lists.results.map((list, id) => (
                                    <div className="p-0" key={id} style={{ width: "150px", height: "150px" }}>
                                        {/* <div className="row">
                                            <div className="col-sm-6">

                                            </div>
                                            <div className="col-sm-6">
                                                <Button onClick={() => handDelete(list.id)} title="Delete List">
                                                    <FontAwesomeIcon icon={faTimesCircle} />
                                                </Button>
                                            </div>
                                        </div> */}
                                        <NavLink to={`/list/${list.id}`}>
                                            <img style={{ width: '100px', height: '100px' }} src="http://icons.iconarchive.com/icons/papirus-team/papirus-places/128/folder-blue-activities-icon.png" alt="" />
                                        </NavLink>
                                        <h5 className="text-white" style={{ fontSize: '1rem' }}>{list.name}</h5>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => ({
    lists: state.user.lists
})

const mapDispatchToProps = dispatch => ({
    getCreatedLists: () => dispatch(userAction.getCreatedLists()),
    createList: list => dispatch(userAction.createList(list)),
    deleteList: id => dispatch(userAction.deleteList(id))
})

Modal.propType = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    className: PropTypes.string,
    // called on componentDidMount
    onEnter: PropTypes.func,
    // called on componentWillUnmount
    onExit: PropTypes.func,
    fade: PropTypes.bool,
    cssModule: PropTypes.object
}

Button.propType = {
    color: PropTypes.string
}

Tooltip.propType = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    placement: PropTypes.oneOf([
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
    ]),
    target: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]).isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatedLists);