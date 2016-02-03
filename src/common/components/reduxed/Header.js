import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openLoginForm } from 'actions//loginForm';
import { openBuyForm } from 'actions//buyForm';
import Menu from 'components//reduxed/Menu';
import ShortDesc from 'content//ShortDesc.md';
import Buy from 'components//reduxed/Buy';
import Login from 'components//reduxed/Login';

class Header extends Component {
  renderHeaderOrForms() {
    if(this.props.buyFormOpen || this.props.loginFormOpen) {
      return (
        <div className="Forms">
            {this.props.buyFormOpen && <Buy/>}
            {this.props.loginFormOpen && <Login/>}
        </div>
      )
    }
    else {
      return (
        <div className="HeaderStuff">
          <Menu />
          <div className="Header__Inner">
            <h1 className="Header__Title">Thinking in React</h1>
            <div className="ShortDesc">
              <ShortDesc />
            </div>
            <a href="http://read.thinkinginreact.xyz" className="ReadButton">Read Excerpt</a>
            <a href="#packages" className="BuyButton" onClick={(e) => { e.preventDefault(); this.props.openBuyForm() }}>Buy for <em><sup>*</sup>$10</em></a>
            <div className="DuringLaunch">
              * Price goes up by one dollar with every new chapter released.
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <header className="Header">
        {this.renderHeaderOrForms()}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    loginFormOpen: state.loginFormOpen,
    buyFormOpen: state.buyForm.open
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({openLoginForm, openBuyForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
