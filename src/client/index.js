import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers//App';
import Atoms from 'containers//Atoms';
import configureStore from './store/configureStore';
import DevTools from 'containers//DevTools';

require('normalize.css');
require('styles//App.sass');

let initialState;

if(window.hasOwnProperty('__DATA__')) {
  initialState = window.__DATA__;
}

const store = configureStore(initialState);
const rootElement = document.getElementById('app');

if(__DEV__) {
  render(
    <Provider store={store} key="provider">
      <div>
        <Atoms />
        <DevTools />
      </div>
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
