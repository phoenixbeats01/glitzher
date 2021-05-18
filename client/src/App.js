import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar, FooterBar, Error, CookieBanner } from './components';

import './App.css';
import {
  Homepage,
  PriceComparison,
  Tos,
  Privacy,
  Brands,
  PopularProducts,
} from './pages';

/* Google Analytics */
function usePageViews() {
  let location = window.location;
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize('UA-194144958-1');
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
}

function App() {
  usePageViews();
  return (
    <Router>
      <div className='page-container'>
        <div className='content-wrap'>
          <Switch>
            {/* Homepage */}
            <Route exact path='/'>
              <NavBar />
              <Homepage />
            </Route>

            {/* Price Comparison */}
            <Route path='/search'>
              <NavBar />
              <PriceComparison />
            </Route>

            {/* Popular Products */}
            <Route path='/popular-products'>
              <NavBar />
              <PopularProducts />
            </Route>

            {/* Brands */}
            <Route path='/brands'>
              <NavBar />
              <Brands />
            </Route>

            {/* Tos */}
            <Route path='/tos'>
              <NavBar />
              <Tos />
            </Route>

            {/* Privacy Policy */}
            <Route path='/polices/privacy'>
              <NavBar />
              <Privacy />
            </Route>

            {/* Error Page */}
            <Route path='*'>
              <NavBar />
              <Error />
            </Route>
          </Switch>
        </div>
        <FooterBar />
        <div className='fixed inset-x-0 bottom-0'>
          <CookieBanner />
        </div>
      </div>
    </Router>
  );
}

export default App;
