import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Container from './components/container';
import Login from './components/login';
import Lobby from './components/lobby';

import Header from './components/header';
import Home from './components/home';
import RoomList from './components/roomlist';
import Room from './components/room';
import Footer from './components/footer';



export default class RouterComponent extends Component {

  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/room" component={Room} />
            <Route exact path="/room/:id" component={Room} />
          </Switch>
        </Router>
      </Container>
    )
  }
}
