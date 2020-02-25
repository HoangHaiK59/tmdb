import React, {useState, useEffect} from 'react';
import helper from '../../../helper/helper';
import Loading from '../../../Page/Loading/loading';
import Error from '../../../Page/Error/error';
import ViewList from '../viewList';
import Pagination from '../../../Page/Pagination/pagination';

const Discover = props => {
    const [pageId, setPageId] = useState(1);
    const [isDesc, setIsDesc] = useState(true);
    const [,discover, error] = helper.useFetch(
        isDesc ? helper
        .buildQuery(
            process.env.REACT_APP_API_URL,
            props.path.discover,
            {
                api_key: process.env.REACT_APP_API_KEY,
                sort_by: "popularity.desc",
                page: pageId
            }
        ): 
        helper
        .buildQuery(
            process.env.REACT_APP_API_URL,
            props.path.discover,
            {
                api_key: process.env.REACT_APP_API_KEY,
                sort_by: "popularity.asc",
                page: pageId
            }
        )
    );

    useEffect(() => {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Discover"
    })

    const handleSort = (e) => {
        console.log(e.target.value);
        setIsDesc(e.target.value === "desc" ? true: false)
    }

    const handleChange = (e) => {
        if (Number(e.target.value) > discover.total_pages) {
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
        if (pageId === discover.total_pages) {
            setPageId(discover.total_pages);
        }
        else {
            setPageId(pageId + 1);
        }
    }

    if(discover) {
        return (
        <div className="container-fluid position-absolute mt-5" style={{top: '2%'}}>
        <ViewList url_img={process.env.REACT_APP_API_URL_IMAGE} datas={discover.results}/>
        <Pagination
            page={pageId}
            total_pages={discover.total_pages}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
        />
        </div>)
    }else {
        if(error) 
        return <Error />;
        else 
        return <Loading />;
    }
}

export default Discover;