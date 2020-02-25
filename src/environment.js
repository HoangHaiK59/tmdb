const TMDb =  {
    path: {
        search: "/search/movie",
        popular: "/movie/popular",
        upcoming: "/movie/upcoming",
        movie: "/movie/",
        toprated: "/movie/top_rated",
        trending: {
            day: "/trending/movie/day",
            week: "/trending/movie/week"
        },
        discover: "/discover/movie"
    },
    auth : {
        token: "/authentication/token/new",
        session: "/authentication/session/new",
        login: "/authentication/token/validate_with_login",
        deleteSession: "/authentication/session"
    },
}

export default TMDb;