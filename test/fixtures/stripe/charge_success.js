const chargeSuccess = {
  "id": "ch_17QO4VJLeyWO8YnHok8x9whz",
  "object": "charge",
  "amount": 10,
  "amount_refunded": 0,
  "application_fee": null,
  "balance_transaction": "txn_176tgAJLeyWO8YnHde1t26OH",
  "captured": true,
  "created": 1452112795,
  "currency": "usd",
  "customer": null,
  "description": "Bought book ThinkingInReact",
  "destination": null,
  "dispute": null,
  "failure_code": null,
  "failure_message": null,
  "fraud_details": {
  },
  "invoice": null,
  "livemode": false,
  "metadata": {
    "email": "bookworm.productions@gmail.com",
    "name": "Test Invite"
  },
  "order": null,
  "paid": true,
  "receipt_email": "bookworm.productions@gmail.com",
  "receipt_number": null,
  "refunded": false,
  "refunds": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/charges/ch_17QO4VJLeyWO8YnHok8x9whz/refunds"
  },
  "shipping": null,
  "source": {
    "id": "card_17QO4VJLeyWO8YnH6Qguaj3f",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "customer": null,
    "cvc_check": "pass",
    "dynamic_last4": null,
    "exp_month": 2,
    "exp_year": 2020,
    "funding": "credit",
    "last4": "4242",
    "metadata": {
    },
    "name": null,
    "tokenization_method": null
  },
  "statement_descriptor": null,
  "status": "succeeded"
}

export default chargeSuccess
