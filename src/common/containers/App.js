import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components//reduxed/Header';
import TOC from 'components//static/TOC';
import Features from 'components//dumb/Features';
import Examples from 'components//dumb/Examples';
import AboutBook from 'components//static/AboutBook';
import Footer from 'components//dumb/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TOC />
        <Features />
        <Examples />
        <AboutBook />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginFormOpen: state.loginFormOpen,
    buyFormOpen: state.buyForm.open
  }
}

export default connect(mapStateToProps)(App);
