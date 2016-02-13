export default function extractExpiryMonthAndYear(value = '') {
  let expiryMonth, expiryYear;
  value = value.replace(/\s/g, '');
  [expiryMonth, expiryYear] = value.split('/', 2);

  if(expiryYear) {
    if(expiryYear.length == 2 && /^\d+$/.test(expiryYear)) {
      let prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      expiryYear = prefix + expiryYear;
    }
  }

  expiryMonth = parseInt(expiryMonth, 10)
  expiryYear  = parseInt(expiryYear, 10)

  return {expiryMonth, expiryYear};
}
