var path = require('path');
var webpack = require('webpack');
var port = 8000;
var srcPath = path.join(__dirname, '../src');
var publicPath = '/assets/';
var autoprefixer = require('autoprefixer');

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '../build/assets'),
    filename: 'app.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.sass'],
    alias: {
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
    }
  },
  module: {
    preLoaders: [
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'postcss', 'sass?indentedSyntax']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.md/,
        loader: 'react-markdown'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
