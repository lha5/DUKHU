import React from 'react'

import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import swal from 'sweetalert';

import KakaoLoginButton from '../../../assets/images/buttons/kakao_login.png';

const Container = styled.div`
  border: 1px solid mediumpurple;
  width: 1400px;
  height: calc(100vh - 45px - 28px - 2px);
  margin: 0 auto;

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

  const onSuccess = res => {
    const dataToSubmit = res;
    console.log('카카오 로그인 성공 :: ', dataToSubmit);

    axios
      .post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/login`, dataToSubmit)
      .then(response => {
        console.log('응답 값?? ', response.status, response.data);
        if (response.status === 200) {
          const { userToken } = response.data.user_auth;
          const { userTokenExp } = response.data.user_authExp;

          axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('forKakao', dataToSubmit.response.access_token);

          window.location.replace('/');
        } else {
          swal({
            title: '로그인을 할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요.',
            icon: 'error'
          }).then(value => value && props.history.push('/'));
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.');
          console.log('error?? ', error.response.data);
          console.log('error?? ', error.response.status);
          console.log('error?? ', error.response.headers);
        }
        else if (error.request) {
          console.log('요청이 이루어 졌으나 응답을 받지 못했습니다.');
          console.log('error?? ', error.request);
        }
        else {
          console.log('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
          console.log('error', error.message);
        }
        console.log(error.config);
      });
  };

  const onFailure = () => {
    console.log('카카오 로그인 실패');
  };

  return (
    <Container>
      <KakaoLogin
        token={process.env.REACT_APP_KAKAO_JS_KEY}
        onSuccess={res => onSuccess(res)}
        onFail={() => onFailure()}
        onLogout={() => console.info('카카오 계정으로 로그인 로그아웃')}
        render={({ onClick }) => {
          return (
            <img 
              src={KakaoLoginButton}
              onClick={event => {
                event.preventDefault();
                onClick();
              }}
              style={{ cursor: 'pointer' }}
            />
          );
        }}
      />
    </Container>
  )
}

export default SigninPage
