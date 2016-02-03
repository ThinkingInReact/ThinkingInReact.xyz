import React, { Component } from 'react';
import AuthorBio from 'content//AuthorBio.md';

class Author extends Component {
  render() {
    return (
      <section className="Author">
        <AuthorBio />
      </section>
    );
  }
}

export default Author;
