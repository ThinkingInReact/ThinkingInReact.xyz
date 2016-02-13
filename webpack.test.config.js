var context = require.context('./test/client', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
