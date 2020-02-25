import React, { useState, useEffect } from "react";
import Loading from '../../Page/Loading/loading';
import Error from '../../Page/Error/error';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faEye } from '@fortawesome/free-solid-svg-icons';

import helper from '../../helper/helper';

const MovieComing = props => {
  useEffect(() => {
    let url;
    if (props.movie.backdrop_path) {
      url = process.env.REACT_APP_API_URL_POSTER + props.movie.backdrop_path;
    } else {
      url = process.env.REACT_APP_API_DEFAULT_BACKDROP;
    }
    document.body.style.backgroundImage = 'url(' + url + ')';
    document.body.style.backgroundSize = '100%';
    document.title = "Home"
  })
  let styleDiv, styleImage;
  if (window.innerWidth > 1300) {
    styleDiv = {
      width: "180px",
      height: "200px"
    };
    styleImage = {
      width: "180px",
      height: "190px"
    }
  } else {
    styleDiv = {
      width: "200px",
      height: "210px"
    };
    styleImage = {
      width: "200px",
      height: "200px"
    }
  }
  return (
    <div className="container-fluid text-white mt-5 p-0 overflow-hidden position-absolute" >
      <div className="home-container">
        <div className="movie-item" >
          <h1 className="m-4">{props.movie.title}</h1>
          <div className="row">
            <div className="col">
              <NavLink className="btn btn-outline-light m-4 rounded" to={`/movie/${props.movie.id}`}>
                {
                  props.movie.popularity
                }
                <FontAwesomeIcon icon={faEye} />
              </NavLink>
            </div>
            <div className="col">

            </div>
          </div>

        </div>

        <div className="movie-list" >
          <button type="button" className="btn btn-outline-light" onClick={props.handlePrevious}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button type="button" className="btn btn-outline-light" onClick={props.handleNext}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
          <div className="col bg-dark">
            {
              props.movieId <= 11 ? (
                <div className="d-flex flex-row flex-wrap align-items-center justify-content-center ">
                  {
                    props.movies.slice(props.movieId, props.movieId + 9).map((movie, id) => (
                      <div key={id} className="p-1 bd-highlight mr-auto" style={styleDiv}>
                        <NavLink style={{ color: "white" }} to={`/movie/${movie.id}`} data-toggle="tooltip" title={movie.title}>
                          {
                            movie.poster_path ? (
                              <img src={process.env.REACT_APP_API_URL_IMAGE + movie.poster_path} alt={props.title} style={styleImage} />
                            ) : (
                                <img src={process.env.REACT_APP_API_DEFAULT_POSTER} alt={props.title} style={styleImage} />
                              )
                          }
                        </NavLink>
                      </div>
                    ))
                  }
                </div>
              ) : (
                  <div className="d-flex flex-row flex-wrap align-items-center justify-content-center bg-dark" style={{}}>
                    {
                      props.movies.slice(props.movieId, 20)
                        .concat(props.movies.slice(0, Math.abs(props.movieId - 11)))
                        .map((movie, id) => (
                          <div key={id} className="p-2 bd-highlight mr-auto" style={styleDiv}>
                            <NavLink style={{ color: "white" }} to={`/movie/${movie.id}`} data-toggle="tooltip" title={movie.title}>
                              {
                                movie.poster_path ? (
                                  <img src={process.env.REACT_APP_API_URL_IMAGE + movie.poster_path} alt={props.title} style={styleImage} />
                                ) : (
                                    <img src={process.env.REACT_APP_API_DEFAULT_POSTER } alt={props.title} style={styleImage} />
                                  )
                              }
                            </NavLink>

                          </div>
                        ))
                    }
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};


const Home = props => {
  const [movieId, setMovieId] = useState(0);
  const [delay, setDelay] = useState(20 * 1000);
  const [isLoading, data, error] = helper.useFetch(
    `${process.env.REACT_APP_API_URL}${props.path.upcoming}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  helper.useInterval(() => {
    if (movieId >= 0 && movieId < 19) {
      setMovieId(movieId + 1);
    } else {
      setMovieId(0);
    }
  }, delay);

  const handlePrevious = () => {
    if (movieId === 0) {
      setDelay(20 * 1000);
      setMovieId(19);
    } else if (movieId > 0) {
      setDelay(20 * 1000);
      setMovieId(movieId - 1);
    }
  }

  const handleNext = () => {
    if (movieId === 19) {
      setDelay(20 * 1000);
      setMovieId(0);
    } else if (movieId < 19) {
      setDelay(20 * 1000);
      setMovieId(movieId + 1);
    }
  }

  if (data) {
    return (
      <MovieComing
        movie={data.results[movieId]}
        movieId={movieId}
        movies={data.results}
        isLoading={isLoading}
        error={error}
        {...props}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    );
  }
  else {
    if (error)
      return (<Error />)
    return (<Loading />);
  }

};

export default Home;
