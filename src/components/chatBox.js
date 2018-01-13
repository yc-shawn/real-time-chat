import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';
import db from '../utilities/db';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {room: null};
  }
  componentDidMount(){
    this.getRoom();
  }
  getRoom(){
    const roomId = this.props.global.roomId;
    if (roomId === 'lobby'){
      db.lobby.on('value', (res) => {
        this.setState({ room: res.val() });
      })
    } else {
      db.chatList.orderByChild('id').equalTo(roomId).limitToFirst(1).on('value', (res) => {
        this.setState({ room: res.val() });
      });
    }
  }
  render(){
    console.log('this.state.room: ', this.props.global.roomId, this.state.room)
    return !this.state.room ? null : (
      <div class="chat-box">
        <section class="chat-msg-container">
          <ul class="chat-show-msg">
            {this.state.room.msgs.map((msg, i) => {
              return (
                <li className={this.props.user.name === msg.id ? 'chat-box-me' : 'chat-box-other'} key={i}>
                  <div class="chat-name">{msg.name}</div>
                  <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
                  <div class='chat-bubble'>{msg.msg}</div>
                </li>
              )
            })}
          </ul>
        </section>
        <section class="input-box">
          <input type="text" placeholder="Please enter your message"/>
          <Button flat primary swapTheming class="send-btn m-0">
            <i class="fa fa-paper-plane" />
          </Button>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {})(Lobby));
