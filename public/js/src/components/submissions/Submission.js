import React, { Component } from 'react';

export default class Submission extends Component {
  render() {
    return (
      <li> 
        <h3 className="title"><a href="#">{this.props.title}</a></h3>
        <div className="subtitle">by <a href="#">{this.props.user.name}</a> 3 hours ago, source <a href="#">google.pl</a></div>
        <div className="description">{this.props.description}</div>
        <div className="submission-footer"><a href="#">{this.props.comments.length} comments</a> <a href="">share</a></div>
      </li>
    );
  }
}