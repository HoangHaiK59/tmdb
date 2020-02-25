import type from '../constant/type';

const initState = {
    isProcessing: false,
    isSuccess: false,
    error: null,
    isAuth: false,
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case type.DELETE_SESSION_REQUEST:
            return ({ ...state, isProcessing: true, isAuth: false });
        case type.DELETE_SESSION_SUCCESS:
            return ({ ...state, isProcessing: false, isSuccess: true });
        case type.DELETE_SESSION_FAIL:
            return ({ ...state, isProcessing: false, isSuccess: false, error: action.error });
        case type.AUTH_REQUEST:
            return({...state, isProcessing: true, isSuccess: false});
        case type.AUTH_SUCCESS:
            return({...state,isProcessing: false, isAuth: true, isSuccess: true})
        case type.AUTH_FAIL: 
            return({...state,isProcessing: false, isSuccess: false, error: action.error})
        default:
            return state;
    }
}

export default AuthReducer;