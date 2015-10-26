import './style.css';
import React, { Component } from 'react';
import Submission from './Submission';

export default class Submissions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.submissions = [];

  }
  componentDidMount() {
    fetch('/api/submissions')
      .then(raw => raw.json())
      .then(data => this.setState({ submissions: data }));
  }

  render() {
    var subs = this.state.submissions.map(sub => <Submission key={sub.id} {...sub} />);
    return (
      <ul className="submissions">
        {subs}
      </ul> 
    );
  }
}