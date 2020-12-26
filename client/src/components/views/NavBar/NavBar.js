import React from 'react';

import styled from 'styled-components';

import MyPage from './MyPage';

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;

  div.page-title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0 10px 25px;
  }

  @media ${props => props.theme.device.desktop} {
    width: 70%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 65%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }
`;

function NavBar() {
  return (
    <Container>
      <div className="page-title">아임덕후_I'm Dukhu</div>
      <MyPage />
    </Container>
  );
};

export default NavBar;
