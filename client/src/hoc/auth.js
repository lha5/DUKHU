/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

function AuthFunc(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/signin')
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (!option) {
              props.history.push('/');
            }
          }
        }
      })
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}

export default AuthFunc;
