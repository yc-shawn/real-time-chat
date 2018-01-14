import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper, TextField, Button, DialogContainer } from 'react-md';
import { withRouter } from 'react-router-dom'
import { userSignin } from '../actions/user.action';

import db from '../utilities/db';

import Signup from './signup';

class Signin extends Component {
  constructor(){
    super();
    this.state = { signupVisible: false };
  }
  showSignup(signupVisible){
    this.setState({ signupVisible });
  }
  signin(){
    var { username, password } = this.state;
    this.props.userSignin(username, password, () => {
      setTimeout(() => {
        this.props.history.push('/');
      }, 33);
    });
  }

  // Render The Component Signin
  render = () =>
  <div id="signin-page">
    <main class="py-5">
      <h1 class="text-center app-title">Real-time Chat <br/>Web Application</h1>
      <p class="text-center chat-logo"><i class="fa fa-comments" /></p>
      <section class="login-form">
        <TextField required
          id="signin-username"
          label="Username"
          floating={true}
          onChange={(e)=>this.setState({['username']:e})}
          class="mb-3"
        />
        <TextField required
          id="signin-password"
          label="Password"
          floating={true}
          type="password"
          onChange={(e)=>this.setState({['password']:e})}
          class="mb-4"
        />
        <Button raised primary iconClassName="fa fa-sign-in" class="login-btn" onClick={()=>this.signin(true)}>Sign in</Button>
        <p class="mt-2">Don't have the account? Sign up <span class="sign-up-link" onClick={()=>this.showSignup(true)}>here</span></p>
      </section>
    </main>
    <footer class="d-flex justify-content-between signin-footer">
      <span>&copy; 2018 yuxiang chen all rights reserved.</span>
      <span>
        <span>Policy </span>
        <span>Terms</span>
      </span>
    </footer>
    <Signup visible={this.state.signupVisible} showSignup={this.showSignup.bind(this)}/>
  </div>
}

export default withRouter(connect(null, { userSignin })(Signin));
