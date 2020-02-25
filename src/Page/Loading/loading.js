import React from 'react';

import { Spinner } from 'reactstrap';

import PropTypes from 'prop-types';

const Loading = () => {
    return (
        <div className="view-container">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
                </div>
            </div>
        </div>
    )
}

Spinner.propTypes = {
    type: PropTypes.string, // default: 'border'
    size: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    children: PropTypes.string, // default: 'Loading...'
}

export default Loading;