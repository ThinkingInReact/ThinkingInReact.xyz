// import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  isLoggedIn: false,
  boughtPackageId: null,
  email: null,
  name: null,
  invitedToGitHubRepo: false
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        ...action.user,
        isLoggedIn: true
      };
    case 'persist/REHYDRATE':
      if(action.key === 'user'){
        if(window.hasOwnProperty('__DATA__')) {
          return {
            ...state,
            ...window.__DATA__.user
          }
        }
      }

      return state;
    default:
      return state;
  }
}

export default user;
