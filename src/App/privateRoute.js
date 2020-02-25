import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

import TMDb from '../environment';

export const PrivateRoute = ({ component: Component,urlPath,title, ...rest }) => (
    <Fragment>
        <Route
            {...rest}
            render={
                props => localStorage.getItem('user') ?
                    (<Component {...props} {...TMDb} urlPath={urlPath} title={title}/>) :
                    (
                        <Redirect to={{
                            pathname: "/",
                            state: { from: props.location }
                        }} />
                    )
            }
        />
    </Fragment>
);
