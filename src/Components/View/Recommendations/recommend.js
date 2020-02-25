import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';
import ViewList from '../viewList';
import Pagination from '../../../Page/Pagination/pagination';

import helper from '../../../helper/helper';

const Recommendations = (props) => {
    const match = useRouteMatch();
    let history = useHistory();
    history.location.pathname = "/movie";
    const [pageId, setPageId] = useState(1);
    const [, recommendations, error] = helper.useFetch(
        match.params.id ?
            (
                helper.buildQuery(
                    process.env.REACT_APP_API_URL,
                    `${props.path.movie + match.params.id}/recommendations`,
                    {
                        api_key: process.env.REACT_APP_API_KEY,
                        page: pageId
                    }
                )) : (
                helper.buildQuery(
                    process.env.REACT_APP_API_URL,
                    props.path.movie,
                    {
                        api_key: process.env.REACT_APP_API_KEY
                    }
                ))
    )

    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Recommendations"
    })

    const handleChange = (e) => {
        if (Number(e.target.value) > recommendations.total_pages) {
            setPageId(1);
        }
        else {
            setPageId(Number(e.target.value))
        }
    }

    const handlePrevious = () => {
        if (pageId === 1) {
            setPageId(1);
        }
        else {
            setPageId(pageId - 1);
        }
    }

    const handleNext = () => {
        if (pageId === recommendations.total_pages) {
            setPageId(recommendations.total_pages);
        }
        else {
            setPageId(pageId + 1);
        }
        console.log(pageId)
    }

    if (recommendations) {
        return (
            <div className="container-fluid">
                <ViewList
                    datas={recommendations.results}
                    url_img = {process.env.REACT_APP_API_URL_IMAGE}
                    {...props} 
                />

                <Pagination
                    page={pageId}
                    total_pages={recommendations.total_pages}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                />
            </div>
        )
    } else {
        if (error) {
            return (<Error />)
        } else {
            return (<Loading />)
        }
    }
}

export default Recommendations;