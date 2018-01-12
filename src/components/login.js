import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper } from 'react-md';

import { userLogin } from '../actions/user.action';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      name: 'anonymous',
      login: false,
      alert: ''
    }
  }
  render(){
    return (
      <Paper zDepth={2} className="main-content">
        <header>
          <span className="header-action">
            <i className="fa fa-circle" />
            <i className="fa fa-circle" />
            <i className="fa fa-circle" />
          </span>
        </header>
        <main>
          <img src={`${env.assets}images/ychen-logo-dark.png`} />
        </main>
      </Paper>
    )
  }
}

export default connect(null, { userLogin })(Home);
