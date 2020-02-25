import React from 'react';
import '../page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


const Pagination = (props) => {

        return (

                <div className="d-flex justify-content-center align-items-center">
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-secondary" onClick={props.handlePrevious}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                    </div>
                    <div className="p-2 bd-highlight">
                        <div className="input-fix-width ">
                            <div className="input-group" >
                                <input type="number" className="form-control" value={props.page} onChange={props.handleChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text">{props.total_pages}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-secondary" onClick={props.handleNext}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                </div>

        );

}

export default Pagination;