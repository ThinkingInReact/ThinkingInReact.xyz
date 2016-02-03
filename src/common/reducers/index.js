import { combineReducers } from 'redux';
import form from './form';
import loginFormOpen from './loginFormOpen';
import buyForm from './buyForm';
import user from './user';

export default combineReducers({
  form,
  buyForm,
  loginFormOpen,
  user
});
