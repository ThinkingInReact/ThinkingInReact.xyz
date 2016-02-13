/*global __DEV__ Stripe */

import { compose, createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from 'reducers//';
import DevTools from 'containers//DevTools';

// TODO: Check For Stripe
if (window.hasOwnProperty('Stripe')) {
  Stripe.setPublishableKey(window.__STRIPE_PUBLIC__);
}

export default function configureStore(initialState) {
  let store;

  if (__DEV__) {
    store = compose(
      autoRehydrate(),

      // Enables your middleware:
      applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk

      // Provides support for DevTools:
      DevTools.instrument(),

      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)(rootReducer, initialState);
  } else {
    store = compose(
      autoRehydrate(),
      applyMiddleware(thunk)
    )(createStore)(rootReducer, initialState);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers//', () => {
      const nextReducer = require('reducers//');
      store.replaceReducer(nextReducer);
    });
  }

  persistStore(store, {blacklist: ['form']});

  return store;
}
