import React from 'react';

import {useHistory} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const ModalNotify = props => {
    const history = useHistory();
    return (
        <div className="menu-overlay" style={{width: '100%'}}>
            <button className="closebtn" onClick={props.toggle}><FontAwesomeIcon icon={faTimes}/></button>
            <div className="menu-overlay-content">
                <div className="content text-white">
                    <h2>Do you really want to delete this list?</h2>
                </div>
            </div>
            <div className="mofooter">
            <button className="btn btn-cancel" onClick={props.toggle}>Cancel</button>
            <button className="btn btn-green-extra ml-4" onClick={() => {props.delete(props.listId); props.toggle(); history.push(`/account/${JSON.parse(localStorage.getItem('user')).id}/lists`)}}>Delete</button>
            </div>
        </div>
    );
}

export default ModalNotify;