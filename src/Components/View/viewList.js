import React from 'react';

import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { NavLink } from 'react-router-dom';

import Modal from '../../Page/Modal/Lists/lists';

const attributes = {
    className: 'custom-root',
    disabledclassname: 'custom-disabled',
    dividerclassname: 'custom-divider',
    selectedclassname: 'custom-selected'
}

const collect = props => ({
    movieId: props.movieId
})

const ViewList = (props) => {

    const ID = "mn-expand";

    console.log(props)

    const handleMarkFavorite = (event, data) => {
        console.log(data.movieId);
        props.markFavorite(data.movieId);
    }

    const handleAdd2List = (event, data) => {
        console.log(data.movieId);
        props.select(data.movieId);
    }

    if (props.modal)
        return <Modal
            modal = {props.modal}
            movieId = {props.movieId}
            lists={props.lists}
            toggle={props.toggle}
            add2List={props.add2List}
        />;
    else
        return (
            <div>
                <div className="d-flex justify-content-start flex-row flex-wrap mb-3 ml-5 position-relative">
                    {
                        props.datas.map((data, id) => (
                            <ContextMenuTrigger key={id} id={ID} holdToDisplay={1000} movieId={data.id} collect={collect} >
                                <div className="card mb-2 ml-2 shadow-lg" style={{ width: "200px", height: "270px", background: "rgba(0,0,0,.6)" }}>
                                    <img className="card-img-top img-fluid" src={
                                        data.poster_path ? (
                                            props.url_img + data.poster_path
                                        ) : (
                                                process.env.REACT_APP_API_DEFAULT_POSTER
                                            )
                                    } alt="" style={{ width: "200px", height: "180px" }} />
                                    {/* <div className="overlay">
                                        <div className="text-overview">{data.overview}</div>
                                    </div> */}
                                    <div className="card-body text-left p-0 mt-0" style={{ height: "40px" }}>
                                        <NavLink style={{ fontSize: "0.9rem" }} className="card-title text-info m-0" to={`movie/${data.id}`}>{data.title}</NavLink>
                                    </div>
                                    <div className="card-footer ">
                                        <div className="row">
                                            <div className="col text-left m-0 p-0">
                                                <small className="text-muted">
                                                    {
                                                        data.release_date || data.release ?
                                                            (data.release_date) :
                                                            ("")
                                                    }
                                                </small>
                                            </div>
                                            <div className="col text-right">
                                                <small className="text-muted">
                                                    {
                                                        data.vote_average ?
                                                            (data.vote_average.toString().concat("/10")) :
                                                            ("")
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ContextMenuTrigger>
                        ))
                    }
                </div>
                <ContextMenu id={ID}>
                    <MenuItem
                        data={{}}
                        attributes={attributes}
                        onClick={handleAdd2List}>
                        Add to list
                    </MenuItem>
                    <MenuItem
                        data={{}}
                        attributes={attributes}
                        onClick={handleMarkFavorite}>
                        Mark as favorite
                    </MenuItem>
                </ContextMenu>
            </div>
        );
}

export default ViewList;