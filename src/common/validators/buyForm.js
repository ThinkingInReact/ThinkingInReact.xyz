import cc from 'credit-card';
import extractExpiryMonthAndYear from 'lib//extractExpiryMonthAndYear';

function isValidEmail(emailAddress) {
  var pattern = new RegExp(/@/);
  return pattern.test(emailAddress);
}

function validate(values) {
  const {expiryMonth, expiryYear} = extractExpiryMonthAndYear(values.expiration);

  const creditCard = {
    number: values.number,
    expiryMonth,
    expiryYear,
    cvv: values.cvc
  };

  const validation = cc.validate(creditCard);
  const errors = {};

  // TODO: Figure out how to do this without excluding valid cards
  if(!validation.validCardNumber) {
    // errors.number = "Card Number is invalid";
  }

  if(!validation.validExpiryMonth) {
    errors.expiration = "Expiration Month is Invalid";
  }

  if(!validation.validExpiryYear) {
    errors.expiration = "Expiration Year is Invalid";
  }

  // TODO: Figure out how to do this without excluding valid cards
  if(!validation.validCvv) {
    // errors.cvc = "CVC is Invalid";
  }

  if(!isValidEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  return errors;
}

export default validate;
