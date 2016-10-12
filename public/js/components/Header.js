import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Header extends Component {

  render() {
    return (
      <div id="navigation">
        <nav className="navbar navbar-light bg-faded">
          <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to='/login'>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/messages'>My Messages</Link>
          </li>
          </ul>
        </nav>
      </div>
    );
  }
}
