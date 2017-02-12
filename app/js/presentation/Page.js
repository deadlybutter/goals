import React, { Component } from 'react';

class Page extends Component {
  render() {
    return (
      <div className="page">
        <header>
          <p>header</p>
        </header>
        <article>
          { this.props.children }
        </article>
        <footer className="wrapper">
          <p>&copy; 2017</p>
        </footer>
      </div>
    );
  }
}

module.exports = Page;
