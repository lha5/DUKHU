import { AUTH_USER, SIGNIN_USER, LOGOUT_USER, SIGNUP_USER } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, success: action.payload };
    case SIGNIN_USER:
      return { ...state, success: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}