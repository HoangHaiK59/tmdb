import React from 'react';

import {NavLink} from 'react-router-dom';


const Account = props => {
    console.log(JSON.parse(localStorage.getItem('sessionId')));
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    const accountList = ['Created lists', 'Favorite movies', 'Rated movies', 'Movie watchlist']
    return <div className="container-fluid h-100 position-relative" >
        <div className="container position-absolute text-center" style={{top: "50%", left: "50%",transform: 'translate(-50%, -50%)'}}>
                <div className="d-flex flex-row flex-wrap mr-auto justify-content-center">
                    {
                        accountList.map((list,id) => (
                            <div className="p1" key={id} style={{width: "200px", height: "200px"}}>
                                <h5 className="text-white" style={{fontSize: '1rem'}}>{list}</h5>
                                <NavLink to={`/account/${user_id}/lists`}>
                                    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-places/128/folder-blue-activities-icon.png" alt=""/>
                                </NavLink>
                            </div>
                        ))
                    }
                </div>
        </div>
    </div>
}

export default Account;