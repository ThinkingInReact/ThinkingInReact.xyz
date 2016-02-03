import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import Packages from 'content//Packages';
import { buy, closeBuyForm, boughtBook } from 'actions//buyForm';
import validate from 'validators//buyForm';
import LockIcon from 'icons//LockIcon';
import CloseIcon from 'icons//CloseIcon';
import Card from 'react-credit-card-thing/lib/components/Card';
import cc from 'credit-card';
import cx from 'classnames';
import Loading from 'react-loading';
import stripeImg from 'images/stripe@2x.png'

class Buy extends Component {
  handleSubmit(values, dispatch) {
    this.props.buy(values, this.props.packge.id);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.closeBuyForm();
  }

  renderFormOrMessage() {
    if(!this.props.bought) {
      return this.renderForm();
    } else {
      return this.renderMessage();
    }
  }

  renderSubmittingOrButton() {
    const submit = this.handleSubmit.bind(this);

    if(this.props.submitting) {
      return (
        <Loading type='bars' color='#e3e3e3' />
      );
    } else {
      return (
        <div className="BuyButton_container">
          <button className="BuyButton" onClick={this.props.handleSubmit(submit)}>
            <LockIcon />
            <span className="BuyButton__Text">Buy The Book For ${this.props.packge.price / 100}</span>
          </button>
        </div>
      );
    }
  }

  renderForm() {
    const {fields: {number, expiration, cvc, name, email, password, githubUser}, error,
           pristine, submitting, active, packge, handleSubmit} = this.props;

    const focused = active;
    const submit = this.handleSubmit.bind(this);

    const emailField = {};
    const cardType = cc.determineCardType(number.value);

    return (
      <form onSubmit={handleSubmit(submit)} className='BuyForm'>
        <Card number={number.value} cvc={cvc.value} expiry={expiration.value} name={name.value} focused={focused}  />

        <div className="CardNumber__Container">
          <input type="text" className={cx('CardNumber', {'CardNumber--Error error': number.touched && number.error})} placeholder="Card Number" {...number} />

          {number.touched && number.error && <label className="CardNumber__Error error">{number.error}</label>}
        </div>

        <input type="text" className="CardName" placeholder="Your Name" {...name} />

        <div className="CardExpiration__Container">
          <input type="text" className={cx('CardExpiration', {'CardExpiration--Error error': expiration.touched && expiration.error})} placeholder="MM/YY" {...expiration} />

          {expiration.touched && expiration.error && <label className="CardCVC__Error error">{expiration.error}</label>}
        </div>


        <div className="CardCVC__Container">
          <input type="text" className={cx('CardCVC', {'CardCVC--Error': cvc.touched && cvc.error})} placeholder="cvc" {...cvc} />

          {cvc.touched && cvc.error && <label className="CardCVC__Error error">{cvc.error}</label>}
        </div>

        <div className="BuyEmail__container">
          <input type="text" placeholder="Email" {...email} className={cx('BuyEmail', {'BuyEmail--Error error': email.touched && email.error})} />

          {email.touched && email.error && <label className="BuyEmail__Error error">{email.error}</label>}
        </div>

        <div className="BuyPassword__container">
          <input type="password" placeholder="Password" className="BuyPassword" {...password} />
        </div>

        <div className="GitHubUser__container">
          <input name="githubuser" type="text" placeholder="Optional GitHub Username *" className="GitHubUser" {...githubUser} />
          <label>* If you want access to the GitHub repo </label>
        </div>

        <div className="Buy__Submit">{this.renderSubmittingOrButton()}</div>
        {error && !pristine && <div className="Buy__Error">{error}</div>}
      </form>
    );
  }

  renderMessage() {
    return (
      <div className="BuyForm__Message">
        <p>
          You have bought the book for ${this.props.packge.price / 100}.
          Stripe should have sent you a receipt to your email.
          You can now read ThinkingInReact by visiting <a href="https://read.ThinkingInReact.xyz">read.ThinkingInReact.xyz</a>.
        </p>
        <p>
          If you run into any troubles you can tweet <a href="https://twitter.com/k_2052">@k_2052</a>
          Or drop me a message at <a href="mailto:k@2052.me">k@2052.me</a>.
          If you requested access to the GitHub repo you can file issues at <a href="https://github.com/ThinkingInReact/ThinkingInReact/issues"> github.com/ThinkingInReact/ThinkingInReact/issues</a>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="Buy">
        <a className="BuyClose" href="#" onClick={this.handleClose.bind(this)}>
          <CloseIcon />
        </a>

        {this.renderFormOrMessage()}
        <img className="StripeImg" src={stripeImg} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    packge: Packages.find((element) => element.id == state.buyForm.packageId),
    open: state.buyForm.open,
    bought: state.buyForm.bought
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ buy, closeBuyForm, boughtBook}, dispatch);
}

Buy = connect(mapStateToProps, mapDispatchToProps)(Buy);

Buy = reduxForm({
  form: 'buy',
  fields: ['number', 'expiration', 'cvc', 'name', 'email', 'password', 'githubUser'],
  validate
})(Buy);

export default Buy;
