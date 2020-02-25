import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App/App';
import * as serviceWorker from './Registers/serviceWorker';

import { Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/style.css';

import rootReducer from './store';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import history from './helper/history';

require('dotenv').config();

const middlewares = [];

if(process.env.NODE_ENV === `development`) {
    const {logger} = require('redux-logger');

    middlewares.push(thunk,logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
