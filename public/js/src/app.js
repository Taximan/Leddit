import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './global.css';

import {
  Navigation,
  Container,
  Submissions
} from './components';


class App extends Component {
  render() {
    return (
      <div>
        <Navigation activeRoute={'/#'} />
        <Container>
            {this.props.children}
        </Container>
      </div>
    );
  }
}

import createHistory from 'history/lib/createBrowserHistory'
import {
  Router,
  Route,
  IndexRoute
} from 'react-router';

ReactDOM.render((
  <Router history={createHistory({ queryKey: false })}>
    <Route path="/" component={App}>
      <IndexRoute component={Submissions} />
    </Route>
  </Router>
  ), document.getElementById('app-root'));