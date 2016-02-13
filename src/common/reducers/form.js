import {reducer as reduxFormReducer} from 'redux-form';

function form(state = {}, action) {
  let nextState = reduxFormReducer(state, action);
  let buy = nextState.buy;

  if(!buy) {
    buy = {};
  }

  return nextState;
}

export default form;
