import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper, TextField, Button } from 'react-md';

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
        <header class="d-flex justify-content-between">
          <span class="header-action">
            <i class="fa fa-circle" />
            <i class="fa fa-circle" />
            <i class="fa fa-circle" />
          </span>
          <a class="logo-container" href={ENV.link.homepage}>
            <img src={`${ENV.assets}images/ychen-logo-dark.png`} />
          </a>
        </header>
        <main id="login-page" class="p-5">
          <h1 class="text-center app-title">Real-time Chat <br/>Web Application</h1>
          <section class="login-form">
            <TextField
              label="Username"
              floating={true}
              class="mb-3"
            />
            <TextField
              label="Password"
              floating={true}
              type="password"
              class="mb-4"
            />
            <Button raised primary iconClassName="fa fa-sign-in" class="login-btn">Sign in</Button>
          </section>
        </main>
      </Paper>
    )
  }
}

export default connect(null, { userLogin })(Home);
