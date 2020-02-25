import React, { Component } from 'react';
import Pagination from '../../../Page/Pagination/pagination';
import ViewList from '../viewList';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            total_pages: 1,
            datas: []
        }
    }

    componentDidMount() {
        console.log("[popular.js]",this.props)
        this.fetchPopular();
    }

    componentDidUpdate(prevProps, prevState) {
        document.body.style.backgroundImage = 'url(' + process.env.REACT_APP_API_DEFAULT_BACKDROP + ')';
        document.body.style.backgroundSize = '100%';
        document.title = "Popular"
        if (this.state.page !== prevState.page) {
            this.fetchPopular(this.state.page);
        }
    }

    fetchAPI(url) {
        fetch(url).then(response => response.json()).then(data => this.setState({
            total_pages: data.total_pages,
            datas: data.results
        }));
    }

    fetchPopular(page) {
        let url = process.env.REACT_APP_API_URL + this.props.path.popular + `?api_key=${process.env.REACT_APP_API_KEY}`;
        if (page) {
            url += `&page=${page}`;
        }
        this.fetchAPI(url);
    }

    handleChange = (e) => {
        if (Number(e.target.value) > this.state.total_pages)
            this.setState({
                page: 1
            })
        else this.setState({
            page: Number(e.target.value)
        })
    }

    handlePrevious = () => {
        if (this.state.page === 1) {
            this.setState({
                page: 1
            })
        }
        else {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    handleNext = () => {
        if (this.state.page === this.state.total_pages) {
            this.setState({
                page: this.state.total_pages
            })
        }
        else {
            this.setState({
                page: this.state.page + 1
            })
        }
    }

    render() {
        return (
            <div className="container-fluid mt-5 position-absolute" style={{top: '2%'}}>
                <ViewList url_img={process.env.REACT_APP_API_URL_IMAGE} datas={this.state.datas}/>
                <Pagination
                    page={this.state.page}
                    total_pages={this.state.total_pages}
                    handleChange={this.handleChange}
                    handleNext={this.handleNext}
                    handlePrevious={this.handlePrevious}
                />
            </div>
        );
    }
}

export default Popular;