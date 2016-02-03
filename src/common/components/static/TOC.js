import React, { Component } from 'react';
import TOCMD from 'content//TOC.md';

class TOC extends Component {
  render() {
    return (
      <section className="TOC">
        <h1 className="TOC__Title">
          Table of Contents
        </h1>
        <TOCMD />
      </section>
    );
  }
}

export default TOC;
