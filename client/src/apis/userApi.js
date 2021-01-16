import axios from 'axios';

export function logout(config) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/logout`, config);
}