/*eslint no-console: 0*/

/**
 * This is compiled to the root of the project (server.js) so all import paths should be relative to that location
 */
import path from 'path';
import React from 'react';
import ECT from 'ect';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { User } from './models'
import routes from './routes';
import configureStore from './store';
import initialData from './initialData';
import App from 'containers//App';

let webpack, webpackDevMiddleware, webpackHotMiddleware, config;
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const ectRenderer = ECT({ watch: true, root: './src/server/views', ext : '.ect' });

app.set('views', './src/server/views');
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// Sessions
mongoose.connect(process.env['MONGO_URI']);

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sessionStore = new MongoDBStore( {
  uri: process.env['MONGO_URI']
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

let sess = {
  resave: true,
  saveUninitialized: false,
  secret: process.env['SESSION_SECRET'],
  store: sessionStore,
  cookie: { httpOnly: true, domain: process.env['SESSION_DOMAIN']}
};

app.use(session(sess));

// passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Payment Routes
app.use(routes);

// Dev Stuff
if(process.env['NODE_ENV'] == 'development') {
  // Webpack middleware
  webpack = require('webpack');
  webpackDevMiddleware = require('webpack-dev-middleware');
  webpackHotMiddleware = require('webpack-hot-middleware');
  config = require('./cfg/client/webpack.dev.js');

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(function(err, req, res, next) {
  var responseData;

	if (err.name === 'JsonSchemaValidation') {
		// Log the error however you please
		console.log(err.message);

		// Set a bad request http response status
		res.status(400);

		// Format the response body
		responseData = {
			statusText: 'Bad Request',
			jsonSchemaValidation: true,
			validations: err.validations,  // All of your validation information,
      error: {
        message: 'Bad Request'
      }
		};

		// Respond with the right content type
	  res.json(responseData);

	} else {
		// pass error to next error middleware handler
		next(err);
	}
});

// Assets
app.use('/assets', express.static(path.resolve('./build/assets')));

// Index
app.get('/', function(req, res) {
  let data = initialData(req, res);
  let store = configureStore(data);

  const reactApp = renderToString(
  <Provider store={store}>
    <App />
  </Provider>)

  res.render('index', { title: 'Thinking In React', data, env: process.env, reactApp });
});

app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + process.env.PORT);
});

export { app };
