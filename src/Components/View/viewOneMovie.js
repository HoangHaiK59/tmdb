import React from 'react';
import helper from '../../helper/helper';
import { NavLink } from 'react-router-dom';

const ViewOneMovie = props => {
    return (
        <div className="container-fluid mt-5 position-absolute" style={{top: '2%'}}>
            <div className="card mb-3 mt-5" style={{ maxWidth: "900px", maxHeight: "800px", top: "15%", left: "25%", background: "rgba(0,0,0,.85)" }}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img className="card-img" src={process.env.REACT_APP_API_URL_IMAGE + props.movie.poster_path} alt={props.movie.original_title} />
                        <div className="text-center mt-4">
                            <NavLink className="btn btn-warning" to={`/video/${props.movie.id}`}>Trailer</NavLink>
                            <button className="btn btn-danger ml-2">Watch</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h3 className="card-title text-white">{props.movie.original_title}</h3>
                                </div>
                                <div className="col text-right">
                                    <NavLink className="text-warning" to={`/recommendations/${props.movie.id}`}>
                                        Recommendations
                                </NavLink>
                                </div>
                            </div>
                            <h5 className="card-title text-success">{props.movie.tagline}</h5>
                            <p className="card-text text-white">{props.movie.overview}</p>

                            <h5 className="card-title text-success">Production Company</h5>
                            <p className="card-text text-white">
                                {
                                    props.movie.production_companies.map(production => production['name']).join(',')
                                }
                            </p>
                            <div className="card mb-3 bg-transparent border-0" style={{ maxWidth: "450px", maxHeight: "250px" }}>
                                <div className="row no-gutters">
                                    <div className="col-md-5">
                                        <h5 className="card-title text-white">
                                            {
                                                Object.keys(props.movie).filter(key => key === "release_date")
                                                    .map(key => key.concat(':').replace('_', ' ')
                                                        .replace(/\w\S*/g, txt => {
                                                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                                        }))
                                            }
                                        </h5>
                                        <h5 className="card-title text-success">{props.movie.release_date}</h5>

                                        <h5 className="card-title text-white">
                                            {
                                                Object.keys(props.movie).filter(key => key === "revenue")
                                                    .map(key => key.concat(':')
                                                        .replace(/\w\S*/g, txt => {
                                                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                                        }))
                                            }
                                        </h5>
                                        <h5 className="card-title text-success">
                                            {
                                                helper.Formatter.format(props.movie.revenue)
                                            }
                                        </h5>
                                    </div>
                                    <div className="col-md-7 text-right">
                                        <h5 className="card-title text-white">
                                            {
                                                Object.keys(props.movie).filter(key => key === "running_time" || key === "runtime")
                                                    .map(key => key.concat(':').replace('_', ' ')
                                                        .replace(/\w\S*/g, txt => {
                                                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                                        }))
                                            }
                                        </h5>
                                        <h5 className="card-title text-success">
                                            {
                                                Number(props.movie.running_time ? undefined : props.movie.runtime).toString().concat(' mins')
                                            }
                                        </h5>
                                        <h5 className="card-title text-white">
                                            {
                                                Object.keys(props.movie)
                                                    .filter(key => key === "vote_average")
                                                    .map(key => key.concat(':')
                                                        .replace('_', ' ')
                                                        .replace(/\w\S*/g, txt => (
                                                            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                                                        ))
                                                    )
                                            }
                                        </h5>
                                        <h5 className="card-title text-success">
                                            {
                                                Number(props.movie.vote_average).toString().concat('/10')
                                            }
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title text-success">Genres</h5>
                            <p className="card-text text-white">
                                {
                                    props.movie.genres.map(genre => genre['name']).join(',')
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOneMovie;