import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';

import helper from '../../../helper/helper';

const Video = (props) => {
    const match = useRouteMatch();
    const [, videos, error] = helper.useFetch(
        helper.buildQuery(
            process.env.REACT_APP_API_URL,
            match.params.id ?
                props.path.movie + match.params.id + '/videos' :
                props.path.movie,
            {
                api_key: process.env.REACT_APP_API_KEY
            }
        )
    )

    const [,movie, errorState] = helper.useFetch(
        helper.buildQuery(
            process.env.REACT_APP_API_URL,
            match.params.id ?
                props.path.movie + match.params.id :
                props.path.movie,
            {
                api_key: process.env.REACT_APP_API_KEY
            }
        )
    )

    useEffect(() => {
        if(movie) {
            let url;
            if(movie.backdrop_path) {
                url = process.env.REACT_APP_API_URL_POSTER + movie.backdrop_path;
            }else {
                url = process.env.REACT_APP_API_DEFAULT_BACKDROP;
            }
            document.body.style.backgroundImage = 'url('+ url +')';
            document.body.style.backgroundSize = '100%';
            document.title = movie.title;
        }
    })
    if (videos && movie) {
        return (
            <div className="container-fluid p-0 m-0" style={{ width: "100%", height: "100%" }}>
                <div className="row" style={{ width: "60%", height: "60%" }}>
                    <div className="col">
                    <div className="embed-responsive embed-responsive-16by9">
                    <iframe width="1280" height="533" title={movie.title} src={`https://www.youtube.com/embed/${videos.results[0].key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    </div>
                </div>
            </div>
        );
    } else {
        if (error || errorState) {
            return (<Error />)
        } else {
            return (<Loading />)
        }
    }
}

export default Video;