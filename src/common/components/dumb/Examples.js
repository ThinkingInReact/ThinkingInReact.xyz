import React, { Component } from 'react';
import Example from './Example';
import examples from 'content//Examples.js';

class Examples extends Component {
  static defaultProps = { examples }

  render() {
    let exampleRows = [];
    this.props.examples.map((example, index) => {
      exampleRows.push(<Example {...example} key={index} />);
    });

    return (
      <section className="WhatYouWillBuild Examples">
        <h1 className="Examples__Title">What You Will Build</h1>
        <div className="Examples_Rows">
          {exampleRows}
        </div>
      </section>
    );
  }
}

export default Examples;
