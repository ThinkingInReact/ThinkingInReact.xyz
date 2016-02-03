import React, { Component } from 'react';
import PrereleaseDesc from 'content//PrereleaseDesc.md';

class Prerelease extends Component {
  render() {
    return (
      <div className="Prerelease">
        <div className="PrereleaseDesc">
          <PrereleaseDesc />
        </div>
        <a className="Read" href="http://read.thinkinginreact.xyz">Read Excerpt</a>
        <a className="Buy" href="#packages">Buy</a>
      </div>
    );
  }
}
export default Prerelease;
