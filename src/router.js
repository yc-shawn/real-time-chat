import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/header';
import Home from './components/home';
import RoomList from './components/roomlist';
import Room from './components/room';
import Footer from './components/footer';

export default class RouterComponent extends Component {

  render() {
    return (
      <Router>
        <div className="container px-0">
          <Route render={props =>
            <Header route={props} />
          }/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms" component={RoomList} />
            <Route exact path="/room" component={Room} />
            <Route exact path="/room/:id" component={Room} />
          </Switch>
          <Route render={props =>
            <Footer route={props} />
          }/>
        </div>
      </Router>
    )
  }
}
