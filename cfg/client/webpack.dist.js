var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('../webpack.base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({
  entry: path.join(__dirname, '../../src/client/index'),
  cache: false,
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
       }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ]
}, baseConfig);

config.debug = false;

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  exclude: /node_modules/
});

config.module.loaders.push({
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css!postcss-loader!sass?indentedSyntax=true&sourceMap=false')
});

module.exports = config;
