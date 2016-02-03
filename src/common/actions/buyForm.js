import cc from 'credit-card';
import { startSubmit, stopSubmit } from 'redux-form';
import { checkAndParse } from 'lib//fetchMiddleware';
import extractExpiryMonthAndYear from 'lib//extractExpiryMonthAndYear';
import { addUser } from './user';

export function openBuyForm(packageId = 'book') {
  return {
    type: 'OPEN_BUY_FORM',
    packageId
  };
}

export function closeBuyForm() {
  return {
    type: 'CLOSE_BUY_FORM'
  };
}

export function boughtBook() {
  return {
    type: 'BOUGHT_BOOK'
  };
}

export function failedToBuy(errorMessage) {
  return stopSubmit('buy', {_error: errorMessage});
}

export function charge(status, response, values, packageId) {
  if(response.error) {
    return failedToBuy(response.error.message);
  }

  return (dispatch, getState) => {
    fetch('/buy', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stripeToken: response.id, ...values, packageId })
    })
    .then(checkAndParse)
    .then(function(data) {
      dispatch(stopSubmit('buy'));
      dispatch(boughtBook());
      dispatch(addUser(data.user));
    }).catch(function(error) {
      dispatch(failedToBuy(error.error.message));
    })
  };
}

export function buy(values, packageId) {
  return (dispatch, getState) => {
    dispatch(startSubmit('buy'));

    const {expiryMonth, expiryYear} = extractExpiryMonthAndYear(values.expiration);

    Stripe.card.createToken({
      number: cc.sanitizeNumberString(values.number),
      cvc: values.cvc,
      exp_month: expiryMonth,
      exp_year: expiryYear
    }, (status, response) => {
      dispatch(charge(status, response, values, packageId));
    });
  }
}
