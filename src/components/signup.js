import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper, TextField, Button, DialogContainer } from 'react-md';
import { withRouter } from 'react-router-dom'
import randomID from 'random-id';

import { userLogin } from '../actions/user.action';
import db from '../utilities/db';

class Signup extends Component {
  constructor(){
    super();
    this.state = { signupVisible: false };
  }
  signin(){
    var { username, password, firstname, lastname } = this.state;
    if (username && password && firstname && lastname){
      db.user.orderByChild('username').equalTo(username).limitToFirst(1).once('value', (res) => {
        if (_.values(res.val()).length > 0){
          alert('your username was been used')
        } else {
          db.user.push({
            id: randomID(10, 'aA0'),
            name: `${firstname} ${lastname}`,
            username,
            password,
            firstname,
            lastname
          }, () => {
            this.props.showSignup(false);
          });
        }
      });
    }
  }
  editText = (field, e) => this.setState({[field]:e});

  // Render The Component Signup
  render = () =>
  <DialogContainer
    id="signup-dialog"
    actions={[
      { secondary: true, children: 'Cancel', onClick: ()=>this.props.showSignup(false) },
      { primary: true, children: 'Confirm', onClick: ()=>this.signin() }
    ]}
    visible={this.props.visible}
    onHide={()=>this.props.showSignup(false)}
    title="Sign up">
    <TextField required
      id="signup-username"
      label="Username"
      onChange={(e)=>this.editText('username', e)}
      placeholder="Enter your username"
    />
    <TextField required
      id="signup-password"
      label="Passowrd"
      type="password"
      onChange={(e)=>this.editText('password', e)}
      placeholder="Enter your password"
    />
    <TextField required
      id="signup-firstname"
      label="First Name"
      onChange={(e)=>this.editText('firstname', e)}
      placeholder="Enter your first name"
    />
    <TextField required
      id="signup-lastname"
      label="Last Name"
      onChange={(e)=>this.editText('lastname', e)}
      placeholder="Enter your last name"
    />
  </DialogContainer>
}

export default withRouter(connect(null, { userLogin })(Signup));
