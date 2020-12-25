import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import SignInPage from './views/SigninPage/SigninPage';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SignInPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
