/*global Stripe */

import { startSubmit, stopSubmit } from 'redux-form'
import { checkAndParse } from 'lib//fetchMiddleware'
import { addUser } from './user'

export function openBuyForm(packageId = 'book') {
  return {
    type: 'OPEN_BUY_FORM',
    packageId
  }
}

export function closeBuyForm() {
  return {
    type: 'CLOSE_BUY_FORM'
  }
}

export function markBuyFormAsFinished() {
  return {
    type: 'MARK_BUY_FORM_AS_FINISHED'
  }
}

export function markBuyFormAsFailed(errorMessage: string) {
  return stopSubmit('buy', {_error: errorMessage})
}

export function charge(response: Object, creditCard: Object, userDetails: Object, packageId: string) {
  return dispatch => {
    fetch('/buy', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stripeToken: response.id, ...creditCard, ...userDetails, packageId })
    })
    .then(checkAndParse)
    .then(function(data) {
      dispatch(stopSubmit('buy'));
      dispatch(markBuyFormAsFinished());
      dispatch(addUser(data.user));
    }).catch(function(error) {
      dispatch(markBuyFormAsFailed(error.error.message));
    })
  }
}

export function buy(creditCard: Object, userDetails: Object, packageId: string) {
  return dispatch => {
    dispatch(startSubmit('buy'));

    Stripe.card.createToken(creditCard, (status, response) => {
      if(response.error) {
        dispatch(markBuyFormAsFailed(response.error.message))
      } else {
        dispatch(charge(response, creditCard, userDetails, packageId));
      }
    });
  }
}
