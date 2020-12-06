import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import SignInPage from './views/SigninPage/SigninPage';
import SignUpPage from './views/SignupPage/SignupPage';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
