var path = require('path');
var srcPath = path.join(__dirname, '../../src/');

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|md|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: [/node_modules/]
      }
    ]
  },
  node : { fs: 'empty' },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      helpers: path.join(__dirname, '../../test/helpers'),
      actions:    srcPath + '/common' + '/actions/',
      components: srcPath + '/common' + '/components/',
      containers: srcPath + '/common' + '/containers/',
      content:    srcPath + '/common' + '/content/',
      icons:      srcPath + '/common' + '/components/icons/',
      images:     srcPath + '/common' + '/images/',
      lib:        srcPath + '/common' + '/lib/',
      reducers:   srcPath + '/common' + '/reducers/',
      styles:     srcPath + '/common' + '/styles/',
      validators: srcPath + '/common' + '/validators/',
      types:      srcPath + '/common' + '/types/',
      schemas:    srcPath + '/common' + '/schemas/',
    }
  }
};
