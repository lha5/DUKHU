import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import logo from '../../../assets/images/logo.png'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1400px;
  margin: 0 auto;

  div.page-title {
    margin-left: 15px;

    img {
      display: block;
      width: 100px;
      margin: 12px auto;
    }
  }

  div.user-menu {
    margin-right: 15px;
  }

  @media ${props => props.theme.device.desktop} {
    width: 70%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 70%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 80%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function NavBar() {
  const user = useSelector(state => state.user);

  const isLoggedin = () => {
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
  }

  return (
    <Container>
      <Link to="/">
        <div className="page-title">
          <img src={logo} alt="아임덕후" />
        </div>
      </Link>
      {isLoggedin()}
    </Container>
  );
}

export default NavBar;
