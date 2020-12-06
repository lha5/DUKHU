import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import SignInPage from './views/SigninPage/SigninPage';
import Footer from './views/Footer/Footer';

const Contianer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <Contianer>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SignInPage} />
      </Switch>
      <Footer />
    </Contianer>
  );
}

export default App;
