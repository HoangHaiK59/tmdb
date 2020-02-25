import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TMDb from '../environment';

//import Popular from '../Components/View/Popular/popular';
import Home from '../Components/Home/home';
import Movie from '../Components/View/Detail-Movie/movie';
//import Rating from '../Components/View/Rating/rating';
import Trending from '../Components/View/Trending/trending';
import Recommendations from '../Components/View/Recommendations/recommend';
import Video from '../Components/View/Video/video';
//import Discover from '../Components/View/Discover/discover';
import Search from '../Components/Search/search';
import Auth from '../Components/Authentication/authentication';
import Account from '../Components/Account/account';
import CreatedLists from '../Components/Account/CreatedList/createdList';
import List from '../Components/Account/List/list';
import Navigation from '../Components/Navigation/navigation';
import People from '../Components/People/people';

import {PrivateRoute} from '../App/privateRoute';


const MovieView = () => {
  let props = TMDb;
  return (
    <div className="root-container" style={{backgroundColor: 'rgba(0,0,0,.5)' }}>
        {
            localStorage.getItem('user') ? <Navigation /> : <header></header>
        }
      <main className="w-100 h-100" >
        <div className="container-fluid w-100 h-100 m-0 p-0 position-relative" >
        <Switch>
          <PrivateRoute path="/home"  component={Home} />
          <Route path="/" exact render={() => <Auth {...props} />} />
          <PrivateRoute 
          path="/popular" 
          component={People} 
          urlPath="/movie/popular" 
          title="Popular" />
          <PrivateRoute 
          path="/discover" 
          component={People}
          urlPath="/discover/movie"
          title="Discover"
          />
          <PrivateRoute path="/movie/:id" exact component={Movie} />
          <PrivateRoute 
          path="/toprated"  
          component={People} 
          urlPath="/movie/top_rated" 
          title="Top rated" 
          backdropPath=""/>
          <PrivateRoute path="/account/:id" exact component={Account}/>
          <PrivateRoute path="/trending" exact component={Trending } />
          <PrivateRoute path="/search" exact component={Search} />
          <PrivateRoute path="/video/:id" exact component={Video} />
          <PrivateRoute path="/recommendations/:id" exact component={() => <Recommendations {...props} />} />
          <PrivateRoute path="/account/:id/lists" exact component={CreatedLists}/>
          <PrivateRoute path="/list/:id" exact component={List}/>
        </Switch>
        </div>

      </main>

      <footer>
        <div className="fixed-bottom">

        </div>
      </footer>
    </div>
  )
}

export default MovieView;