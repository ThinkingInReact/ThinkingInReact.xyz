import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openBuyForm } from 'actions//buyForm';

class Package extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleBuyClick = this.handleBuyClick.bind(this);
  }

  handleBuyClick(e) {
    e.preventDefault();
    this.props.openBuyForm(this.props.id);
  }

  render() {
    return (
      <div className="Package">
        <h2 className="Package__Title">{this.props.title}</h2>
        <div className="Package__Desc">
          <Markdown source={this.props.desc} />
        </div>

        <a href="#" className="Package__BuyButton" onClick={this.handleBuyClick}>
          <span>Buy</span>
          (<small className="LimitedAsterisk">*</small> <bold className="Price">${this.props.price / 100}</bold>)
        </a>

        <small>* only ${this.props.price / 100} during pre-release</small>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({openBuyForm}, dispatch);
}

export default connect(null, mapDispatchToProps)(Package);
