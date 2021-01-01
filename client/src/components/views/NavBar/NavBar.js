import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

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

  div.user-menu {
    border: 1px solid pink;
    margin: 10px 25px 10px 0;
    height: fit-content;
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
  const user = useSelector(state => state.user);

  const isLogin = () => {
    if (user.userData && !user.userData.isAuth) {
      return (
        <div className="user-menu">
          <Link to="/signin">
            로그인
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-menu">
          <Link to="/mypage">
            마이 페이지
          </Link>
        </div>
      );
    }
  };
  return (
    <Container>
      <Link to="/">
        <div className="page-title">아임덕후_I'm Dukhu</div>
      </Link>
      {isLogin()}
    </Container>
  );
};

export default NavBar;
