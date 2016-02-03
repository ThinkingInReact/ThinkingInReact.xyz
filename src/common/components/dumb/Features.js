import React, { Component } from 'react';
import Feature from './Feature';
import features from 'content//Features';

class Features extends Component {
  static defaultProps = { features }

  render() {
    let featureRows = [];

    this.props.features.map((feature, index) => {
      featureRows.push(<Feature {...feature} key={index} />);
    });

    return (
      <section className="Features">
        <h1 className="Features__Title">What you Get</h1>
        <div className="Features__Rows">
          {featureRows}
        </div>
      </section>
    );
  }
}

export default Features;
