import Type from '../constant/type';
import axios from '../../helper/axios';

var queryString = require('querystring');

const session_id = JSON.parse(localStorage.getItem('sessionId')).session_id;

const user_id = JSON.parse(localStorage.getItem('user')).id;


const getCreatedListsReq = () => {
    return {
        type: Type.GET_CREATED_LISTS_REQ
    }
}

const getCreatedListsSuccess = (lists) => {
    return {
        type: Type.GET_CREATED_LISTS_SUCCESS,
        lists: lists
    }
}

const getCreatedListsFail = (error) => {
    return {
        type: Type.GET_CREATED_LISTS_FAIL,
        error: error
    }
}

const getCreatedLists = () => {
    return dispatch => {
        dispatch(getCreatedListsReq());

        const id = JSON.parse(localStorage.getItem('user')).id;
        const url = process.env.REACT_APP_API_URL + `/account/${id}/lists?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: JSON.parse(localStorage.getItem('sessionId')).session_id
        })}`;

        axios.get(url)
            .then(res => {
                if (res.data) {
                    dispatch(getCreatedListsSuccess(res.data))
                } else {
                    dispatch(getCreatedListsFail(res.data.error))
                }
            })
            .catch(error => dispatch(getCreatedListsFail(error)))
    }
}

const createListReq = () => {
    return {
        type: Type.CREATE_LIST_REQ
    }
}

const createListSuccess = () => {
    return {
        type: Type.CREATE_LIST_SUCCESS
    }
}

const createListFail = error => {
    return {
        type: Type.CREATE_LIST_FAIL,
        error: error
    }
}

const createList = (list) => {
    return dispatch => {
        dispatch(createListReq());

        const session_id = JSON.parse(localStorage.getItem('sessionId')).session_id;

        const url = process.env.REACT_APP_API_URL + `/list?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id
        })}`;

        axios
        .post(url,{...list})
        .then(res => {
            if(res.data.success) {
                dispatch(createListSuccess())
            }else {
                dispatch(createListFail(res.data))
            }
        })
        .catch(error => dispatch(createListFail(error)))
    }
}

const deleteListReq = () => {
    return {
        type: Type.DELETE_LIST_REQ
    }
}

const deleteListSuccess= () => {
    return {
        type: Type.DELETE_LIST_SUCCESS
    }
}

const deleteListFail = (error) => {
    return {
        type: Type.DELETE_LIST_FAIL,
        error: error
    }
}

const deleteList = (id) => {
    return dispatch => {
        deleteListReq();

        const session_id = JSON.parse(localStorage.getItem('sessionId')).session_id;

        const url = process.env.REACT_APP_API_URL + `/list/${id}?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id
        })}`;

        let idDel =  {
            id: id
        }

        axios
        .delete(url, {
            params: {...idDel}
        })
        .then(res => {
            if(res.data.success) {
                dispatch(deleteListSuccess())
            }else {
                dispatch(deleteListFail(res.data))
            }
        })
        .catch(error => dispatch(deleteListFail(error)))
    }
}

const markFavoriteReq = () => {
    return {
        type: Type.MARK_FAVORITE_REQ
    }
}

const markFavoriteSuccess = () => {
    return {
        type: Type.MARK_FAVORITE_SUCCESS
    }
}

const markFavoriteFail = (error) => {
    return {
        type: Type.MARK_FAVORITE_FAIL,
        error: error
    }
}

const markFavorite = (movieId) => {
    return dispatch => {
        dispatch(markFavoriteReq());

        const url = process.env.REACT_APP_API_URL + `/account/${user_id}/favorite?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id
        })}`;

        const movieFR = {
            media_type: "movie",
            media_id: movieId,
            favorite: true
        }

        axios
        .post(url, {...movieFR})
        .then(res => {
            if(res.data) {
                dispatch(markFavoriteSuccess())
            }else {
                dispatch(markFavoriteFail(res.error))
            }
        })
        .catch(error => dispatch(markFavoriteFail(error)))
    }
}

const add2ListReq = () => {
    return {
        type: Type.ADD_2_LIST_REQ
    }
}

const add2ListSuccess = () => {
    return {
        type: Type.ADD_2_LIST_SUCCESS
    }
}

const add2ListFail = (error) => {
    return {
        type: Type.ADD_2_LIST_FAIL,
        error: error
    }
}

const add2List = (listId , movieId) => {
    return dispatch => {
        dispatch(add2ListReq());

        const url = process.env.REACT_APP_API_URL + `/list/${listId}/add_item?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id
        })}`;

        axios
        .post(url, {media_id: movieId})
        .then(res => {
            if(res.data) {
                dispatch(add2ListSuccess())
            }else {
                dispatch(add2ListFail(res.error))
            }
        })
        .catch(error => dispatch(add2ListFail(error)))
    }
}

const removeMovieReq = () => {
    return {
        type: Type.REMOVE_MOVIE_REQ
    }
}

const removeMovieSuccess = () => {
    return {
        type: Type.REMOVE_MOVIE_SUCCESS
    }
}

const removeMovieFail = (error) => {
    return {
        type: Type.REMOVE_MOVIE_FAIL,
        error: error
    }
}

const removeMovie = (listId , movieId) => {
    return dispatch => {
        dispatch(removeMovieReq());

        const url = process.env.REACT_APP_API_URL + `/list/${listId}/remove_item?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id
        })}`;

        axios
        .post(url, {media_id: movieId})
        .then(res => {
            if(res.data) {
                dispatch(removeMovieSuccess())
            }else {
                dispatch(removeMovieFail(res.error))
            }
        })
        .catch(error => dispatch(removeMovieFail(error)))
    }
}

const clearListReq = () => {
    return {
        type: Type.CLEAR_LIST_REQ
    }
}

const clearListSuccess = () => {
    return {
        type: Type.CLEAR_LIST_SUCCESS
    }
}

const clearListFail = (error) => {
    return {
        type: Type.CLEAR_LIST_FAIL,
        error: error
    }
}

const clearList = (listId , confirm) => {
    return dispatch => {
        dispatch(clearListReq());

        const url = process.env.REACT_APP_API_URL + `/list/${listId}/clear?${queryString.stringify({
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id,
            confirm: confirm
        })}`;

        axios
        .post(url, {})
        .then(res => {
            if(res.data) {
                dispatch(clearListSuccess())
            }else {
                dispatch(clearListFail(res.error))
            }
        })
        .catch(error => dispatch(clearListFail(error)))
    }
}

export const userAction = {
    getCreatedLists,
    createList,
    deleteList,
    markFavorite,
    add2List,
    removeMovie,
    clearList
}
