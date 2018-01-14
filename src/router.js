import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Container from './components/container';
import Signin from './components/signin';
import Lobby from './components/lobby';


export default class RouterComponent extends Component {

  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/signin" component={Signin} />
          </Switch>
        </Router>
      </Container>
    )
  }
}
