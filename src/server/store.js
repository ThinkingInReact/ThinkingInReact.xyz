import { compose, createStore } from 'redux';
import rootReducer from 'reducers//';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  return store;
}
