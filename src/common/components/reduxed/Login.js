import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { updateLoginEmail, updateLoginPassword, login, closeLoginForm } from 'actions//loginForm';
import c from 'classnames';
import Loading from 'react-loading';
import CloseIcon from 'icons//CloseIcon';

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const {fields: {email, password}} = this.props;
    this.props.login(email.value, password.value);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.closeLoginForm();
  }

  renderLoginOrSubmitting() {
    const submit = this.handleSubmit.bind(this);
    const { handleSubmit } = this.props;

    if(this.props.submitting) {
      return (
        <div className="Login__Submitting">
          <Loading type='bars' color='#e3e3e3' />
        </div>
      );
    }
    else {
      return (
        <a href="/login" className="LoginButton" onClick={this.handleSubmit.bind(this)}> Login </a>
      );
    }
  }

  render() {
    const {fields: {email, password}, error, pristine, submitting, handleSubmit } = this.props;
    const submit = this.handleSubmit.bind(this);

    return (
      <div className="Login">
        <a className="LoginClose" href="#" onClick={this.handleClose.bind(this)}>
          <CloseIcon />
        </a>
        <form onSubmit={handleSubmit(submit)} className='LoginForm'>
           <input type="text"
                 className={c("Login__Email", {"Login__Email--errors error": email.touched && error})}
                 placeholder="email" {...email} />

           <input type="password"
             className={c("Login__Password", {"Login__Password--errors erorr": password.touched && error})}
             placeholder="password"
             ref="password" {...password} />

          {this.renderLoginOrSubmitting()}
          {error && !pristine && <div className="Login__Error">{error}</div>}
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login, closeLoginForm }, dispatch);
}

Login = connect(null, mapDispatchToProps)(Login);

Login = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(Login);

export default Login;
