import React, { useState } from 'react';

import { useRouteMatch/*useHistory*/ } from 'react-router-dom';

import helper from '../../../helper/helper';
//import history from '../../../helper/history';

import Loading from '../../../Page/Loading/loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import { connect } from 'react-redux';
import { userAction } from '../../../store/action/user.action';

import Notify from '../../../Page/Modal/Notify/notify';

const ID = 'context-menu';

const Menu = 'Menu-list';

const attributes = {
    className: 'custom-root',
    disabledclassname: 'custom-disabled',
    dividerclassname: 'custom-divider',
    selectedclassname: 'custom-selected'
}

const collect = props => ({
    listId: props.listId,
    movieId: props.movieId
})

const List = props => {
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const match = useRouteMatch();
    //const history = useHistory();

    const [, list,] = helper.useFetching(process.env.REACT_APP_API_URL + `/list/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`, count);

    const handleWaitResult = (ms) => {
        setTimeout(() => {
            setCount(count + 1);
        }, ms)
    }


    const toggle = () => {
        setModal(!modal);
    }

    const handleRemoveMovie = (event, data) => {
        props.removeMovie(data.listId, data.movieId);
        handleWaitResult(500);
    }

    const handleConfirm = (event, data) => {
        toggle();
    }

    const handleDeleteList = (listId) => {
        props.deleteList(listId);
    }

    if (modal)
        return <Notify 
        listId={list.id}
        toggle={toggle}
        delete={handleDeleteList}
        />

    else {
        if (list)
            return <div className="container-fluid h-75 mt-5 position-absolute" style={{top: '2%'}}>
                <div className="row d-flex flex-row flex-wrap justify-content-start">
                    <div className="col-xs-12 col-lg-3 col-xl-4">
                        <div className="col-sticky">
                            <header className="MovielistHeader">
                                <div className="target">
                                    <div draggable="true">
                                        <div className="media-object">
                                            <div className="media-object-hover">
                                                <div className="react-context-wrapper">
                                                    <div className="cover-art shadow cover-art-auto-height actionable" >
                                                        <div>
                                                            <div className="cover-art-scss">
                                                                <div className="cover-art-image" style={{ backgroundImage: 'url(' + process.env.REACT_APP_API_DEFAULT_POSTER + ')', backgroundSize: '100%' }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="cover-art-playback" dir="ltr">

                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mo-info">
                                                    <div className="react-context-wrapper">
                                                        <div className="mo-info-name" title={list.name}>
                                                            <span dir="auto">{list.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="MovielistHeader__body">
                                    <div className="MovielistHeader__entity-name">
                                        <h2><span dir="auto">{list.name}</span></h2>
                                    </div>
                                </div>
                                <div className="MovielistHeader__button MovielistHeader__button--top">
                                    <p className="" style={{ fontSize: '.8em', fontWeight: 500, color: '#fff' }}>{list.item_count} MOVIES</p>
                                </div>
                                <ContextMenuTrigger id={Menu} listId={list.id} collect={collect} holdToDisplay={1}>
                                    <div className="MovielistHeader-children">
                                        <div className="MovielistHeader-button MovielistHeader__button--bottom">
                                            <div className="horizontal-list MovielistHeader__extrabutton">
                                                <div className="react-context-wrapper">
                                                    <button className="btn btn-transparent btn--narrow">
                                                        <FontAwesomeIcon icon={faEllipsisH} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ContextMenuTrigger>
                            </header>
                            <ContextMenu id={Menu}>
                                <MenuItem data={{}} attributes={attributes} onClick={handleConfirm}>Delete list</MenuItem>
                                <MenuItem data={{}} attributes={attributes} >Copy list link</MenuItem>
                            </ContextMenu>
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-9 col-xl-8">
                        <div></div>
                        <section className="movielist-container movielist-container-rendering">
                            <ol className="movie-list">
                                {
                                    list.items.map((item, id) => (
                                        <div className="react-context-wrapper" key={id}>
                                            <div draggable="true">
                                                <li className="movie-list-row" role="button" tabIndex="0">
                                                    <div className="movie-list-col position-outer" >
                                                        <div className="position-absolute" style={{ minHeight: '50px' }}>

                                                        </div>
                                                    </div>
                                                    <div className="movie-list-col name">
                                                        <div className="movie-list-top-align">
                                                            <div className="movie-list-name ellipsis-one-line" dir="auto">
                                                                {item.title}
                                                            </div>
                                                            <div className="second-line">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ContextMenuTrigger id={ID} holdToDisplay={1} listId={list.id} movieId={item.id} collect={collect}>
                                                        <div className="movie-list-col more">
                                                            <div className="movie-list-top-align">
                                                                <div className="react-context-wrapper">
                                                                    <button className="btn btn-transparent btn--narrow btn--no-margin btn--no-padding">
                                                                        <FontAwesomeIcon icon={faEllipsisH} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ContextMenuTrigger>
                                                    <div className="movie-list-col movie-list-col-duration">
                                                        <div className="movie-list-top-align">
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ol>
                        </section>
                        <ContextMenu id={ID}>
                            <MenuItem data={{}} attributes={attributes} onClick={handleRemoveMovie}>Remove Movie</MenuItem>
                            <MenuItem data={{}} attributes={attributes}>234</MenuItem>
                        </ContextMenu>
                    </div>
                </div>
            </div>
        else
            return <Loading />
    }
}

const mapStateToProps = state => ({
    isSuccess: state.user.isSuccess
});

const mapDispatchToProps = dispatch => ({
    removeMovie: (listId, movieId) => dispatch(userAction.removeMovie(listId, movieId)),
    deleteList: (listId) => dispatch(userAction.deleteList(listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(List);
