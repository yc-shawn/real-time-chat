import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';
import db from '../utilities/db';

class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {room: null};
  }
  crateRoom(){
    let userName = 'user name' || this.state.name;
    let roomName = 'new room' || this.refs.roomName.value;
    db.chatList.push({
      name: roomName,
      id: new Date().getTime().toString(),
      num: 1,
      msgs:[{
        name: userName,
        msg: `I create the room: ${roomName}. Let\'s chat!'`,
        time: firebase.database.ServerValue.TIMESTAMP
      }],
      users:[{
        name: userName,
        num: 1
      }]
    });
  }
  render(){
    return (
      <div class="welcome">
        <h1 class="text-center font-weight-light mb-5">Welcome, Shawn Chen!</h1>
        <h4 class="text-center">You can</h4>
        <p class="text-center">Enter the room on the left side</p>
        <h4 class="text-center">OR</h4>
        <p class="text-center">
          <Button flat primary iconClassName="fa fa-plus" onClick={()=>this.crateRoom()}>Create a new room</Button>
        </p>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {})(Welcome));