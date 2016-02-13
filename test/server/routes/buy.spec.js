require('../bootstrap.js')
var expect = require('chai').expect
var mongoose = require('mongoose')
var request = require('supertest')
var clearDB = require('mocha-mongoose')(process.env['MONGO_URI'], {noClear: true})
var User = require('../../../src/server/models').User
var app = require('../../../server.js').app
var nock = require('nock')

describe('POST /buy', () => {
  before(function(done) {
    if (mongoose.connection.db) return done();

    mongoose.connect(process.env['MONGO_URI'], done);
  });

  beforeEach(function(done) {
    clearDB(done);
  });

  it('registers a new user and buys the book when data is valid', (done) => {
    var details = {
      email: 'bob@booob.com',
      name: 'Bob',
      password: 'bo2b',
      packageId: 'all',
      stripeToken: 'gooodToken'
    }

    nock('https://api.stripe.com')
      .post('/v1/charges')
      .reply(200, {})

    request(app)
      .post('/buy')
      .send(details)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('errors when stripe charge fails', (done) => {
    var details = {
      email: 'bob@booob.com',
      name: 'Bob',
      password: 'bo2b',
      packageId: 'all',
      stripeToken: 'gooodToken'
    }

    nock('https://api.stripe.com')
      .post('/v1/charges')
      .reply(400, { error: { message: 'Invalid request' } });

    request(app)
      .post('/buy')
      .send(details)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(402, done);
  })
})
