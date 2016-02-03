import React, { Component } from 'react';
import Copyright from 'content//Copyright.md';
import Links from 'content//FooterLinks.js';
import Author from 'components//static/Author';

class Footer extends Component {
  static defaultProps = { links: Links }

  render() {
    let links = [];

    this.props.links.map((link, index) => {
      links.push(<a href={link.href} key={index}>{link.text}</a>);
    });

    return (
      <footer className="Footer">
        <Author />
      </footer>
    );
  }
}

export default Footer;
