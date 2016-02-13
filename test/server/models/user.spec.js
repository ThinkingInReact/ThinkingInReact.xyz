require('../bootstrap.js')
var mongoose = require('mongoose')
var User = require('../../../src/server/models').User
var clearDB = require('mocha-mongoose')(process.env['MONGO_URI'], {noClear: true})
var expect = require('chai').expect
var User = require('../../../src/server/models').User

describe('User Model', () => {
  before(function(done) {
    if (mongoose.connection.db) return done();

    mongoose.connect(process.env['MONGO_URI'], done);
  });

  before(function(done) {
    clearDB(done);
  });

  it("can be saved", function(done) {
    User.create({a: 1}, done);
  });

  it("can be listed", function(done) {
    User.find({}, function(err, models){
      expect(err).to.not.exist;
      expect(models).to.have.length(1);

      done();
    });
  });
})
