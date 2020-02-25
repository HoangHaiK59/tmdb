import React, { useState, useEffect } from 'react';

import helper from '../../../helper/helper';

import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';

const TrendingView = (props) => {
    return (
        <div className="container-fluid mt-5 position-absolute" style={{ top: '2%' }}>
            <div className="container-fluid mt-5 p-0 position-relative" style={{ width: "100%", height: "100%" }}>
                <h1 className='text-white-50'>Trending</h1>
                <div className="trending-container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col-1">
                            <select onChange={props.handleChange}>
                                <option>Day</option>
                                <option>Week</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-start mr-auto mb-3">
                        {
                            props.movies.results.map((movie, id) => (
                                <div key={id} className="p-2" style={{ width: "200px", height: "200px" }}>
                                    <img src={process.env.REACT_APP_API_URL_IMAGE + movie.poster_path} alt="" style={{ width: "200px", height: "200px" }} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Trending = (props) => {
    const [isDay, setIsDay] = useState(true);
    const [, movies, error] = helper.useFetch(
        isDay ? helper.buildQuery(
            process.env.REACT_APP_API_URL,
            props.path.trending.day, {
            api_key: process.env.REACT_APP_API_KEY
        }
        ) : helper.buildQuery(
            process.env.REACT_APP_API_URL,
            props.path.trending.week, {
            api_key: process.env.REACT_APP_API_KEY
        }
        )
    )

    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Trending"
    })

    const handleChange = (event) => {
        setIsDay(event.target.value === "Day" ? true : false);
    }

    if (movies) {
        return (<TrendingView
            movies={movies}
            handleChange={handleChange}
            {...props} />)
    } else {
        if (error) {
            return (<Error />)
        } else {
            return (<Loading />)
        }
    }
}

export default Trending;
