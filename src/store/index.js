import {combineReducers} from 'redux';

import AuthReducer from './reducer/auth.reducer';
import UserReducer from './reducer/user.reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer
});

export default rootReducer;

