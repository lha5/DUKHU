import React from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import axios from 'axios';

const Container = styled.div`
  border: 1px solid gold;
  width: 1400px;
  height: calc(100vh - 45px - 28px - 2px);
  margin: 0 auto;

  div.logout-button {
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

function MyPage() {
  const onLogout = () => {
    swal({
      title: '로그아웃 하시겠습니까?',
      icon: 'warning',
      buttons: {
        confirm: {
          text: '로그아웃',
          value: true,
          closeModal: true,
          visible: true
        },
        cancel: {
          text: '취소',
          value: false,
          closeModal: true,
          visible: true
        }
      }
    })
    .then(value => {
      if (value) {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('user_auth')}` }
        };
        const dataToSubmit = {
          kakao_token: localStorage.getItem('k_info')
        };

        axios
          .post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/logout`, dataToSubmit, config)
          .then(response => {
            console.log('카카오 로그아웃 응답 상태:: ', response.status);
            console.log('카카오 로그아웃 응답 값:: ', response.data);
            if (response.status === 200) {
              localStorage.removeItem('k_info');
              localStorage.removeItem('userId');
              localStorage.removeItem('user_auth');
              localStorage.removeItem('user_authExp');

              window.location.replace('/');
            } else {
              swal({
                title: '로그아웃 할 수 없습니다.',
                text: '잠시 후 다시 시도해주세요.',
                icon: 'error'
              });
            }
          }).catch(error => console.error('로그아웃 실패:: ', error));
      } else {
        return false;
      }
    });
  };

  return (
    <Container>
      <div>로그인한 사용자만 볼 수 있는 페이지</div>
      <div className="logout-button" onClick={onLogout}>로그아웃</div>
    </Container>
  );
};

export default MyPage;
