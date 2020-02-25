import React, {useEffect} from 'react';

import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';
import ViewOneMovie from '../viewOneMovie';

import { useRouteMatch } from 'react-router-dom';

import helper from '../../../helper/helper';

const Movie = (props) => {
    let match = useRouteMatch();
    const [, data, error] = helper.useFetch(
        `${process.env.REACT_APP_API_URL}${props.path.movie}${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`
    );

    useEffect(() => {
        if(data) {
            let url;
            if(data.backdrop_path) {
                url = process.env.REACT_APP_API_URL_POSTER + data.backdrop_path;
            }else {
                url = process.env.REACT_APP_API_DEFAULT_BACKDROP;
            }
            document.body.style.backgroundImage = 'url('+ url +')';
            document.body.style.backgroundSize = '100%';
            document.title = data.title;
        }
    })
   
    if(data) {
        return (
            <ViewOneMovie movie = {data} {...props}/>
        ) 
    }else {
        if(error) {
            return (<Error/>)
        }else {
            return (<Loading/>)
        }
    }
}

export default Movie;