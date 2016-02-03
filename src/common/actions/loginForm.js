import { startSubmit, stopSubmit } from 'redux-form';
import { checkAndParse } from 'lib//fetchMiddleware';
import { addUser } from './user';

var serialize = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};

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
  return (dispatch, getState) => {
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
    }).catch(function(error) {
      dispatch(stopSubmit('login', {_error: "email does not exist or password is bad"}));
    })
  };
}
