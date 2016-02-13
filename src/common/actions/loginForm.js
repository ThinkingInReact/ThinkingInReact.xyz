import { startSubmit, stopSubmit } from 'redux-form';
import { checkAndParse } from 'lib//fetchMiddleware';
import { addUser } from './user';
import serialize from 'lib//serialize'

export function openLoginForm() {
  return {
    type: 'OPEN_LOGIN_FORM'
  };
}

export function closeLoginForm() {
  return {
    type: 'CLOSE_LOGIN_FORM'
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(startSubmit('login'));

    fetch('/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: serialize({email, password})
    })
    .then(checkAndParse)
    .then(function(data) {
      dispatch(stopSubmit('login'));
      dispatch(closeLoginForm())
      dispatch(addUser(data.user));
    }).catch(function() {
      dispatch(stopSubmit('login', {_error: 'email does not exist or password is bad'}));
    })
  }
}
