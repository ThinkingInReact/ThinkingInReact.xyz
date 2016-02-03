import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import many from 'components//icons/features/Many.js';
import examples from 'components//icons/features/Examples.js';
import liveDemos from 'components//icons/features/Demos.js';
import github from 'components//icons/features/Github.js';
import source from 'components//icons/features/Source.js';
import more from 'components//icons/features/More.js';

const icons = {
  many,
  examples,
  liveDemos,
  github,
  source,
  more
};

class Feature extends Component {
  render() {
    const Icon = icons[this.props.image];

    return (
      <div className="Feature">
        <div className="FeatureImg">
          <Icon />
        </div>
        <div className="FeatureDesc">
          <h2 className="Feature__Title">{this.props.title}</h2>
          <div className="FeaturedDesc__Text">
            <Markdown source={this.props.desc} />
          </div>
        </div>
      </div>
    );
  }
}

export default Feature;
