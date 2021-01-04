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

  // const getTokenForKakaoLogin = () => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(
  //         `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
  //         axiosConfig,
  //       )
  //       .then((response) => {
  //         console.log('토큰 요청 응답 값?? ', response.status, response.data);
  //         if (response.status === 200) {
  //           resolve({
  //             status: response.status,
  //             headers: response.headers,
  //             data: response.data,
  //           });
  //         } else {
  //           swal({
  //             title: '로그인을 할 수 없습니다.',
  //             text: '잠시 후 다시 시도해주세요.',
  //             icon: 'error',
  //           });
  //         }
  //       })
  //       .catch((error) =>
  //         console.log(
  //           'Error occured in SignInProcessPage.js - getTokenForKakaoLogin() ',
  //           error,
  //         ),
  //         swal({
  //           title: '로그인을 할 수 없습니다.',
  //           text: '잠시 후 다시 시도해주세요.',
  //           icon: 'error',
  //         })
  //       );
  //   });
  // }

  // const getKakaoTokenForLogin = axios.post(
  //   `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
  //   axiosConfig
  // );

  // let getTokenForKakaoLogin = () => {
  //   axios
  //     .post(
  //       `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
  //       axiosConfig,
  //     )
  //     .then((response) => {
  //       console.log('토큰 요청 응답 값?? ', response.status, response.data);
  //       if (response.status === 200) {
  //         return { result: true, data: response.data };
  //       } else {
  //         swal({
  //           title: '로그인을 할 수 없습니다.',
  //           text: '잠시 후 다시 시도해주세요.',
  //           icon: 'error',
  //         });
  //         return { result: false };
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error occured in SignInProcessPage.js - getTokenForKakaoLogin() ', error);
  //       swal({
  //         title: '로그인을 할 수 없습니다.',
  //         text: '잠시 후 다시 시도해주세요.',
  //         icon: 'error',
  //       });
  //       return { result: false };
  //     });
  // };
  var getTokenForKakaoLogin = axios.post(
    `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
    axiosConfig,
  );

  function sendTokenInfo(dataToSubmit) {
    return new Promise((resolve, reject) => {
      axios.post(
        `${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/login`,
        dataToSubmit,
      ).then((response) => {
        console.log('서버로 요청 응답 값?? ', response.status, response.data);
        if (response.status === 200) {
          resolve({
            status: response.status,
            headers: response.headers,
            data: response.data,
          });
        } else {
          swal({
            title: '로그인을 할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요.',
            icon: 'error',
          });
        }
      })
      .catch((error) =>
        console.log(
          'Error occured in SignInProcessPage.js - getTokenForKakaoLogin() ',
          error
        ),
        swal({
          title: '로그인을 할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요.',
          icon: 'error',
        })
      );
    });
  }

  const getKakaoToken = async () => {
    console.log('인가 코드 값 in getKakaoToken()?? ', code.current);
    
    await getTokenForKakaoLogin.then((response) => {
      console.log('토큰 요청 응답 값?? ', response.status, response.data);
      if (response.status === 200) {
        return { result: true, data: response.data };
      } else {
        swal({
          title: '로그인을 할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요.',
          icon: 'error',
        });
        return { result: false };
      }
    })
    .catch((error) => {
      console.log('Error occured in SignInProcessPage.js - getTokenForKakaoLogin() ', error);
      swal({
        title: '로그인을 할 수 없습니다.',
        text: '잠시 후 다시 시도해주세요.',
        icon: 'error',
      });
      return { result: false };
    });

    if (getTokenForKakaoLogin.result) {
      console.log('카카오 토큰 요청 성공');
      axios.post(
        `${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/login`,
        getTokenForKakaoLogin.data,
      ).then((response) => {
        console.log('서버로 요청 응답 값?? ', response.status, response.data);
        if (response.status === 200) {
          console.log('응답 성공');
        } else {
          swal({
            title: '로그인을 할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요.',
            icon: 'error',
          });
          window.location.replace('/');
        }
      })
      .catch((error) => {
        console.log('Error occured in SignInProcessPage.js - getTokenForKakaoLogin() ',  error);
        swal({
          title: '로그인을 할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요.',
          icon: 'error',
        });
        window.location.replace('/');
      });
    } else {
      console.log('카카오 토큰 요청 실패');
      swal({
        title: '로그인을 할 수 없습니다.',
        text: '잠시 후 다시 시도해주세요.',
        icon: 'error',
      });
      // window.location.replace('/');
    }
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
