require('../bootstrap.js')
var app = require('../../../server.js').app
var request = require('supertest')

describe('GET /', () => {
  describe('when we vist the index page', () => {
    it('should render', (done) => {
      request(app)
        .get('/')
        .expect(200, done)
    });
  });
});
