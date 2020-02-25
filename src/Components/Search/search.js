import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import helper from '../../helper/helper';

const Search = (props) => {
    const [query, setQuery] = useState("");
    const handleChange = e => {
        if (e.target.value.length % 2 === 0)
            setQuery(e.target.value);
    }
    const { ref, visible } = helper.useVisible(false);
    const [, movies] = helper.useFetch(
        query ? helper
            .buildQuery(
                process.env.REACT_APP_API_URL,
                props.path.search,
                {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: query
                }
            ) : helper
                .buildQuery(
                    process.env.REACT_APP_API_URL,
                    props.path.search,
                    {
                        api_key: process.env.REACT_APP_API_KEY,
                        query: "a"
                    }
                )
    )
    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Search"
    })
    return (
        <div className="container-fluid mt-5 h-75 position-absolute" style={{top: '10%'}} >
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className='input-wrapper' ref={ref}>
                        <input
                            onChange={handleChange}
                            placeholder='Search...'
                            spellCheck={false}
                            style={{ background:"rgba(0,0,0,.4)"}}
                        />
                        {
                            visible ? <ul className="list-group list" >
                                {
                                    movies ? movies.results
                                        .map((movie, id) => (
                                            <li className="list-group-item list-group-item-action" style={{background:"rgba(0,0,0,.1)"}} key={id}>
                                                <NavLink className="row nav-item text-white-50" to={`/movie/${movie.id}`}>
                                                    <div className="col-sm-1">
                                                        {
                                                            movie.poster_path ? 
                                                            <img className="img-search" src={process.env.REACT_APP_API_URL_IMAGE + movie.poster_path} alt=""/>:
                                                            <img className="img-search" src={process.env.REACT_APP_API_DEFAULT_POSTER} alt=""/>
                                                        }
                                                    </div>
                                                    <div className="col">
                                                        {movie.title}
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )) :
                                        (<li className="list-group-item list-group-item-action"></li>)
                                }
                            </ul> :
                                <ul className="list-group">
                                </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;