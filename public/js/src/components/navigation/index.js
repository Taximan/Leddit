import './styles.css';
import React, { Component } from 'react';

export default class Navigation extends Component {
  render() {
    const isActive = (route) => this.props.activeRoute === route ? 'active' : '';

    return (
      <nav role='navigation'>
        <ul className="nav-right">
          <li className={isActive('#/')} ><a href="#/">Hot</a></li>
          <li className={isActive('#/latest')} ><a href="#/latest">Latest</a></li>
          <li className={isActive('#/alltime')} ><a href="#/alltime">All time</a></li>
        </ul>
        <ul className="nav-left">
          <li><a href="#/login">login</a></li>
          <li><a href="#/register" className="highlight">register</a></li>
        </ul>
      </nav>  
    );
  }
}