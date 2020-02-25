import Type from '../constant/type';
import TMDb from '../../environment';
import axios from '../../helper/axios';
import history from '../../helper/history';

const authRequest = () => {
    return {
        type: Type.AUTH_REQUEST
    }
}

const authSuccess = () => {
    return {
        type: Type.AUTH_SUCCESS,
    }
}

const authFail = (error) => {
    return {
        type: Type.AUTH_FAIL,
        error: error
    }
}

const authSession = (user) => {
    return dispatch => {
        dispatch(authRequest());

        const getToken = () => {
             return axios
            .get(process.env.REACT_APP_API_URL + TMDb.auth.token + `?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                if(res.data) 
                return res.data
            })
            .catch(error => {
                return error
            });
        }
        
        getToken().then(data => {
            let request_token = {
                request_token : data.request_token
            };
                axios
                .post(process.env.REACT_APP_API_URL + TMDb.auth.login + `?api_key=${process.env.REACT_APP_API_KEY}`,{...user, ...request_token})
                .then(res => {
                    if(!res.data.success) {
                        console.log(res.data)
                    } else {
                        let request_token = {
                            request_token : res.data.request_token
                        };
                    axios
                    .post(process.env.REACT_APP_API_URL + TMDb.auth.session + `?api_key=${process.env.REACT_APP_API_KEY}`, {...request_token})
                    .then(res => {
                        if(!res.data.success)
                            dispatch(authFail(res.data));
                        else {          
                            localStorage.setItem('sessionId', JSON.stringify({
                                session_id: res.data.session_id,
                            }))

                            axios
                            .get(process.env.REACT_APP_API_URL + `/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${JSON.parse(
                                localStorage.getItem('sessionId')
                            ).session_id}`)
                            .then(res => {
                                if(!res.data.error) {
                                    dispatch(authSuccess());
                                    localStorage.setItem('user', JSON.stringify({
                                        id: res.data.id,
                                        username: res.data.username,
                                        isAuth: true
                                    }))
                                }else {
                                    dispatch(authFail(res.data)); 
                                }
                            })
                            .catch(error => dispatch(authFail(error)))

                            history.push('/home')
                        }
                    })
                }
                })
                .catch(error => dispatch(authFail(error)))
            })

    }
}


const deleteSessionRequest = () => {
    return {
        type: Type.DELETE_SESSION_REQUEST
    }
}

const deleteSessionSuccess = () => {
    return {
        type: Type.DELETE_SESSION_SUCCESS
    }
}

const deleteSessionFail = (error) => {
    return {
        type: Type.DELETE_SESSION_FAIL,
        error: error
    }
}

const deleteSession = () => {
    return dispatch => {
        dispatch(deleteSessionRequest());
        let user = JSON.parse(localStorage.getItem('sessionId'));
        let sessionId = {
            session_id : user.session_id
        };
        axios
        .delete(process.env.REACT_APP_API_URL + TMDb.auth.deleteSession + `?api_key=${process.env.REACT_APP_API_KEY}`, 
        {
            params: {...sessionId}
        })
        .then(res => {
            if(!res.data.success) {
                dispatch(deleteSessionFail(res.data))
            }else {
                dispatch(deleteSessionSuccess());
                localStorage.removeItem('sessionId');
                localStorage.removeItem('user');
            }
        })
        .catch(error => dispatch(deleteSessionFail(error)))
    }
}

export const AuthAction = {
    authSession,
    deleteSession
}
