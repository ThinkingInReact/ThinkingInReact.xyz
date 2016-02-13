// Toodo Make these actual types https://github.com/codemix/babel-plugin-typecheck/issues/110
type StripeCreditCard = {
  number: String,
  cvc: String,
  exp_month: String,
  exp_year: String
}

export default StripeCreditCard;
