require('dotenv').load();

var mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI']);
var User = require('./server/models/user');

User.register(new User({ email: 'bob@bob.com', name: 'bob'}), 'bob', function() { console.log('done') });
