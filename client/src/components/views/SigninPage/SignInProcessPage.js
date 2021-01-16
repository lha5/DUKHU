import React, { useEffect, useRef } from 'react'

import axios from 'axios';
import swal from 'sweetalert';

function SignInProcessPage() {
  const code = useRef();

  useEffect(() => {
    const thisUrlParameter = window.location.search;
    console.log('주소 파라미터?? ', thisUrlParameter);

    if (thisUrlParameter) {
      const codeArray = thisUrlParameter.split('=');
      console.log('full code?? ', codeArray);

      if (codeArray[0].indexOf('code') !== -1) {
        code.current = codeArray[1];

        getKakaoToken();
      } else {
        window.location.replace('/');
      }
    }
  }, []);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const hostName = 'https://kauth.kakao.com/oauth/token';
  const grantType = 'grant_type=authorization_code';

  const getKakaoToken = () => {
    console.log('인가 코드 값 in getKakaoToken()?? ', code.current);

    axios
      .post(
        `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
        axiosConfig,
      )
      .then((response) => {
        console.log('토큰 요청 응답 상태 ', response.status);
        console.log('토큰 요청 응답 값 ', response.data);
        if (response.status === 200) {
          console.log('카카오 토큰 요청 성공');
          axios
            .post(
              `${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/login`,
              response.data,
            )
            .then((response) => {
              console.log(
                '서버로 요청 응답 값?? ',
                response.status,
                response.data,
              );
              if (response.status === 200) {
                console.log('응답 성공');

                localStorage.setItem('userId', response.data.user_id);
                localStorage.setItem('k_info', response.data.k_info);
                localStorage.setItem('user_auth', response.data.user_auth);
                localStorage.setItem('user_authExp', response.data.user_authExp);

                window.location.replace('/');
              } else {
                swal({
                  title: '로그인을 할 수 없습니다.',
                  text: '잠시 후 다시 시도해주세요.',
                  icon: 'error',
                }).then(() => window.location.replace('/'));
              }
            })
            .catch((error) => {
              console.log(
                'Error occured in SignInProcessPage.js - getKakaoToken() ',
                error,
              );
              swal({
                title: '로그인을 할 수 없습니다.',
                text: '잠시 후 다시 시도해주세요.',
                icon: 'error',
              }).then(() => window.location.replace('/'));
            });
        } else {
          swal({
            title: '로그인을 할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요.',
            icon: 'error',
          }).then(() => window.location.replace('/'));
        }
      })
      .catch((error) => {
        console.log(
          'Error occured in SignInProcessPage.js - getKakaoToken() ',
          error,
        );
        swal({
          title: '로그인을 할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요.',
          icon: 'error',
        }).then(() => window.location.replace('/'));
      });
  };

  return (
    <div>
      로그인 수행 중
      <br />
      보이면 안 되는 페이지
    </div>
  );
};

export default SignInProcessPage;
