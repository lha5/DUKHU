import React from 'react'

import styled from 'styled-components';

import KakaoLoginButton from '../../../assets/images/buttons/kakao_login.png';

const Container = styled.div`
  border: 1px solid mediumpurple;
  width: 1400px;
  height: calc(100vh - 45px - 28px - 2px);
  margin: 0 auto;

  img {
    cursor: pointer;
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

function SigninPage(props) {

  const host = 'https://kauth.kakao.com/oauth/authorize?response_type=code';

  return (
    <Container>
      <a href={`${host}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`}>
        <img src={KakaoLoginButton} />
      </a>
    </Container>
  )
}

export default SigninPage
