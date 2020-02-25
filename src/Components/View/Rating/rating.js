import React, { useState, useEffect } from 'react';
import ViewList from '../viewList';
import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';
import Pagination from '../../../Page/Pagination/pagination';
import helper from '../../../helper/helper';

import {userAction} from '../../../store/action/user.action';

import {connect} from 'react-redux';

const Rating = (props) => {
    const [pageId, setPageId] = useState(1);
    const [movieId, setMovieId] = useState(0);
    const [modal, setModal] = useState(false);

    const [, lists,] = helper.useFetching(
        helper.buildQuery(process.env.REACT_APP_API_URL, 
            `/account/${JSON.parse(localStorage.getItem('user')).id}/lists`,
            {
                api_key: process.env.REACT_APP_API_KEY,
                session_id: JSON.parse(localStorage.getItem('sessionId')).session_id
            })
        , 0);

    const [, movies, error] = helper.useFetch(helper.buildQuery(process.env.REACT_APP_API_URL, props.path.toprated, {
        api_key: process.env.REACT_APP_API_KEY,
        page: pageId
    }))

    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Rating"
    })

    const handleChange = (e) => {
        if (Number(e.target.value) > movies.total_pages) {
            setPageId(1);
        }
        else {
            setPageId(Number(e.target.value))
        }
    }

    const handlePrevious = () => {
        if (pageId === 1) {
            setPageId(1);
        }
        else {
            setPageId(pageId - 1);
        }
    }

    const handleNext = () => {
        if (pageId === movies.total_pages) {
            setPageId(movies.total_pages);
        }
        else {
            setPageId(pageId + 1);
        }
    }

    const toggle = () => {
        setModal(!modal);
    }

    const handleSelect = (moviedId) => {
        toggle();
        setMovieId(moviedId);
    }

    const handleAdd2List = (listId, movieId) => {
        props.add2List(listId, movieId);
        toggle();
    }
    

    if (movies && lists) {
        return (
            <div className="container-fluid mt-5 position-absolute" style={{top: '2%', transition: '.5s ease-in'}}>
                <ViewList
                lists = {lists}
                modal = {modal}
                movieId = {movieId}
                toggle = {toggle}
                markFavorite = {props.markFavorite}
                add2List = {handleAdd2List}
                select = {handleSelect}
                url_img={process.env.REACT_APP_API_URL_IMAGE} 
                datas={movies.results} />
                <Pagination 
                page={pageId}
                total_pages={movies.total_pages}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                />
            </div>
        )
    } else {
        if (error) {
            return (<Error />)
        } else {
            return (<Loading />)
        }
    }
}

const mapStateToProps = state => ({
    isSuccess: state.user.isSuccess
});

const mapDispatchToProps = dispatch => ({
    markFavorite: (movieId) => dispatch(userAction.markFavorite(movieId)),
    add2List : (listId, movieId) => dispatch(userAction.add2List(listId, movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
