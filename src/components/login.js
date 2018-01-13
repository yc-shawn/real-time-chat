import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper, TextField, Button } from 'react-md';
import { withRouter } from 'react-router-dom'
import { userLogin } from '../actions/user.action';

class Signin extends Component {
  constructor(){
    super();
  }
  signin(){
    this.props.history.push('/lobby/')
  }
  render(){
    return (
      <div id="signin-page">
        <main class="py-5">
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
            <Button raised primary iconClassName="fa fa-sign-in" class="login-btn" onClick={() => this.signin()}>Sign in</Button>
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
      </div>
    )
  }
}

export default withRouter(connect(null, { userLogin })(Signin));
