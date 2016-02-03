const BuySchema = {
  type: 'object',
  properties: {
    stripeToken: {
      type: 'string',
      required: true
    },
    packageId: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  }
}

export default BuySchema;
