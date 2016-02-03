import {reducer as reduxFormReducer} from 'redux-form';

function form(state = {}, action) {
  let nextState = reduxFormReducer(state, action);
  let buy = nextState.buy;

  if(!buy) {
    buy = {};
  }

 /**
  *
  * TODO: Make this work
  if(action.type == 'redux-form/CHANGE') {
    if(action.field == 'email') {
      let githubUser = {value: action.value.split('@')[0] };

      if(buy.githubUser) {
        if(buy.githubUser.visited) {
          githubUser = { };
        }
      }

      return {
        ...state,
        ...nextState,
        buy: Object.assign({}, buy, { githubUser })
      };
    }
  }
  */

  return nextState;
}

export default form;
