var mongoose = require('mongoose');
var User;

try {
  User = mongoose.model('users')
} catch(e) {
  User = mongoose.model('users', require('./user'))
}

module.exports = {
  User: User
}
