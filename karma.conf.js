var webpackConfig = require('./cfg/client/webpack.test.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'jsdom' ],
    singleRun: true,
    frameworks: [ 'mocha', 'chai', 'sinon', 'sinon-chai' ],
    files: [
      'webpack.test.config.js',
      require.resolve('stripe-debug')
    ],
    plugins: [
      'karma-jsdom-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai'
    ],
    preprocessors: {
      'webpack.test.config.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};
