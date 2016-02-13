require('../bootstrap.js')
var expect = require('chai').expect
var mongoose = require('mongoose')
var request = require('supertest')
var clearDB = require('mocha-mongoose')(process.env['MONGO_URI'], {noClear: true})
var User = require('../../../src/server/models').User
var app = require('../../../server.js').app

describe('POST /login', () => {
  before(function(done) {
    if (mongoose.connection.db) return done();

    mongoose.connect(process.env['MONGO_URI'], done);
  });

  before(function(done) {
    clearDB(done);
  });

  it('logins a user when data is valid', (done) => {
    var user = {
      name: 'Bob',
      email: 'bob@bob.com',
      boughtPackageId: 'all'
    }

    var password = 'cats'

    User.register(new User(user), password, (err, user) => {
      request(app)
        .post('/login')
        .send({ email: 'bob@bob.com', password: password })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })

  it('refuses to login a user when data is invalid', (done) => {
    var user = {
      name: 'Bob',
      email: 'bob@bob.com',
      boughtPackageId: 'all'
    }

    var password = 'cats'

    User.register(new User(user), password, (err, user) => {
      request(app)
        .post('/login')
        .send({ email: 'bob@bob.com', password: 'badpass' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403, done);
    })
  })
});
