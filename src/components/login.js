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
      <Paper zDepth={2} class="main-content">
        <header>
          <span class="header-action">
            <i class="fa fa-circle" />
            <i class="fa fa-circle" />
            <i class="fa fa-circle" />
          </span>
        </header>
        <main id="login-page">
          <div class="logo-container p-5 text-center">
            <img src={`${ENV.assets}images/ychen-logo-dark.png`} />
          </div>
          <h3 class="text-center">Real-time Chat <br/>Web Application</h3>
          <p class="text-center">This is online chat web application, You can login with your name and create or enter a room to start chatting with other people!</p>
          <section>
            
          </section>
        </main>
      </Paper>
    )
  }
}

export default connect(null, { userLogin })(Home);
