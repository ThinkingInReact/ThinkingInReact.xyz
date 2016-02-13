import cc from 'credit-card'
import extractExpiryMonthAndYear from 'lib//sanitizers/extractExpiryMonthAndYear'
import StripeCreditCardSchema from 'schemas/StripeCreditCard'

export default function stripeCreditCardFromFormValues(values) {
  const {expiryMonth, expiryYear} = extractExpiryMonthAndYear(values.expiration);

  const stripeCreditCard = {
    number: cc.sanitizeNumberString(values.number),
    cvc: values.cvc,
    exp_month: expiryMonth,
    exp_year: expiryYear
  }

  if(StripeCreditCardSchema(stripeCreditCard)) {
    return stripeCreditCard
  } else {
    throw new Error('Invalid Stripe Details')
  }
}
