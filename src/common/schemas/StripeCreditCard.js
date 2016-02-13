import schema from 'js-schema'

export default schema({
  number: [Number, String],
  cvc: [Number, String],
  exp_month: [Number, String],
  exp_year: [Number, String]
})
