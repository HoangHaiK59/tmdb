import Type from '../constant/type';

const initState = {
    isSuccess: false,
    isProcessing: false,
    lists: null,
    error: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.GET_CREATED_LISTS_REQ:
            return ({ ...state, isProcessing: true });
        case Type.GET_CREATED_LISTS_SUCCESS:
            return ({ ...state, isProcessing: false, isSuccess: true, lists: action.lists });
        case Type.GET_CREATED_LISTS_FAIL:
            return ({ ...state, isProcessing: false, isSuccess: false, error: action.error });
        case Type.CREATE_LIST_REQ:
        case Type.DELETE_LIST_REQ:
        case Type.MARK_FAVORITE_REQ:
        case Type.ADD_2_LIST_REQ:
        case Type.REMOVE_MOVIE_REQ:
        case Type.CLEAR_LIST_REQ:
            return ({ ...state, isProcessing: true });
        case Type.CREATE_LIST_SUCCESS:
        case Type.DELETE_LIST_SUCCESS:
        case Type.MARK_FAVORITE_SUCCESS:
        case Type.ADD_2_LIST_SUCCESS:
        case Type.REMOVE_MOVIE_SUCCESS:
        case Type.CLEAR_LIST_SUCCESS:
            return ({ ...state, isProcessing: false, isSuccess: true });
        case Type.CREATE_LIST_FAIL:
        case Type.DELETE_LIST_FAIL:
        case Type.MARK_FAVORITE_FAIL:
        case Type.ADD_2_LIST_FAIL:
        case Type.REMOVE_MOVIE_FAIL:
        case Type.CLEAR_LIST_FAIL:
            return ({ ...state, isProcessing: false, isSuccess: false, error: action.error });
        default:
            return state
    }
}

export default userReducer;