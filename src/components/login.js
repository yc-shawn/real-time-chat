import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper, TextField, Button } from 'react-md';

import { userLogin } from '../actions/user.action';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      zoomed: false
    }
  }
  zoom(zoomed){
    this.setState({zoomed});
  }
  render(){
    return (
      <Paper zDepth={2} class={`main-content ${this.state.zoomed ? 'fullscreen': 'container'}`}>
        <header class="d-flex justify-content-between">
          <span class="header-action">
            <i class="fa fa-circle" />
            <i class="fa fa-circle" onClick={() => this.zoom(false)}/>
            <i class="fa fa-circle" onClick={() => this.zoom(true)}/>
          </span>
          <a class="logo-container" href={ENV.link.homepage}>
            <img src={`${ENV.assets}images/ychen-logo-dark.png`} />
          </a>
        </header>
        <main id="signin-page" class="py-5">
          <h1 class="text-center app-title">Real-time Chat <br/>Web Application</h1>
          <p class="text-center chat-logo"><i class="fa fa-comments" /></p>
          <section class="login-form">
            <TextField
              id="signin-username"
              label="Username"
              floating={true}
              class="mb-3"
            />
            <TextField
              id="signin-password"
              label="Password"
              floating={true}
              type="password"
              class="mb-4"
            />
            <Button raised primary iconClassName="fa fa-sign-in" class="login-btn">Sign in</Button>
            <p>Don't have the account? Sign up <span class="sign-up-link">here</span></p>
          </section>
        </main>
        <footer class="d-flex justify-content-between">
          <span>&copy; 2018 yuxiang chen all rights reserved.</span>
          <span>
            <span>Policy </span>
            <span>Terms</span>
          </span>
        </footer>
      </Paper>
    )
  }
}

export default connect(null, { userLogin })(Home);
