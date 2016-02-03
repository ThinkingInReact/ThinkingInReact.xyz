import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openLoginForm } from 'actions//loginForm';
import { openBuyForm } from 'actions//buyForm';
import Links from 'content//Links.js';

class Menu extends Component {
  static defaultProps = { links: Links }

  render() {
    let links = [];
    let filteredLinks = this.props.links.filter((link) => {
      if(!link.type) {
        return true;
      }

      if(this.props.loggedIn && link.type == 'LOGGED_IM') {
        return true;
      }

      if(!this.props.loggedIn && link.type == 'LOGGED_OUT') {
        return true;
      }

      return false;
    });

    filteredLinks.map((link, index) => {
      links.push(<a href={link.href} key={index}>{link.text}</a>);
    });

    links.push(<a className="BuyLink" href="#packages" key="buy"
                  onClick={(e) => { e.preventDefault(); this.props.openBuyForm() }}>Buy</a>);

    if(this.props.loggedIn) {
      links.push(<a className="LogoutLink" href="/logout" key="logout">Logout</a>);
    } else {
      links.push(<a className="LoginLink" href="#login" key="login"
                    onClick={(e) => { e.preventDefault(); this.props.openLoginForm() }}>Login</a>);
    }
    return (
      <nav className="Menu">
        {links}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({openLoginForm, openBuyForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
