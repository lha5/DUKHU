import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from '../hoc/auth';

import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import SignInPage from './views/SigninPage/SigninPage';
import SignInProcessPage from './views/SigninPage/SignInProcessPage';
import MyPage from './views/MyPage/MyPage';
import SchedulePage from './views/SchedulePage/SchedulePage';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/signin" component={Auth(SignInPage, false)} />
        <Route exact path="/signin/process" component={Auth(SignInProcessPage, false)} />
        <Route exact path="/mypage" component={Auth(MyPage, true)} />
        <Route exact path="/schedule" component={Auth(SchedulePage, true)} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
