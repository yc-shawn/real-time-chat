import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { DialogContainer, TextField, Button } from 'react-md';
import db from '../utilities/db';

class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = { roomName: 'new room', createVisible:false };
  }
  crateRoom(){
    let userName = this.props.user.name;
    let roomName = this.state.roomName;
    db.chatList.push({
      name: roomName,
      id: new Date().getTime().toString(),
      num: 1,
      msgs:[{
        userId: this.props.user.id,
        name: userName,
        msg: `I create the room: ${roomName}. Let\'s chat!`,
        time: firebase.database.ServerValue.TIMESTAMP
      }],
      users:[{
        name: userName,
        num: 1
      }]
    }, () => this.showCreate(false));
  }
  showCreate(createVisible){
    this.setState({createVisible});
  }
  render(){
    return (
      <div class="welcome">
        <h1 class="text-center font-weight-light mb-5">Welcome, Shawn Chen!</h1>
        <h4 class="text-center">You can</h4>
        <p class="text-center">Enter the room on the left side</p>
        <h4 class="text-center">OR</h4>
        <p class="text-center">
          <Button flat primary iconClassName="fa fa-plus" onClick={()=>this.showCreate(true)}>Create a new room</Button>
        </p>
        <DialogContainer
          id="create-new-room-dialog"
          actions={[
            { secondary: true, children: 'Cancel', onClick: ()=>this.showCreate(false) },
            { primary: true, children: 'Confirm', onClick: ()=>this.crateRoom() }
          ]}
          visible={this.state.createVisible}
          onHide={()=>this.showCreate(false)}
          title="Create a new room">
          <TextField required
            id="create-new-room-name"
            label="Room Name"
            value={this.state.roomName}
            onChange={(e) => this.setState({['roomName']:e})}
            placeholder="Enter room name"
          />
        </DialogContainer>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {})(Welcome));
