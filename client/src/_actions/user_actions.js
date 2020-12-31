import axios from 'axios';

import { AUTH_USER } from './types';

export function auth() {
  const request = axios
    .get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}