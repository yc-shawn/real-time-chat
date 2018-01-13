import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';

import ChatListItem from './chatListItem';
import ChatBox from './chatBox';
import Welcome from './welcome';

import db from '../utilities/db';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = { chatList: [], lobby: null }
  }
  componentDidMount(){
    db.lobby.on('value', (snapshot) => {
      this.setState({ lobby: snapshot.val() });
    })
    db.chatList.on('child_added', (snapshot)=>{
      console.log('chatlist:', snapshot.val());
      let list = snapshot.val();
      if (list != null){
        var chatList = this.state.chatList;
        chatList.push(list)
        this.setState({ chatList });
      };
      console.log(this.state.chatList);
    });
  }
  render(){
    return (
      <main class="lobby d-flex align-items-stretch">
        <div class="chat-list d-flex flex-column justify-content-between">
          <ul class="list-content">
            <ChatListItem room={this.state.lobby} lobby={true}/>
            {this.state.chatList.map((room, index) =>
              <ChatListItem room={room} key={room.id}/>
            )}
          </ul>
          <div class="user-self d-flex">
            <div class="user-avatar">
              <i class="fa fa-user-circle-o" />
            </div>
            <div class="user-info d-flex flex-column">
              <span>Shawn Chen</span>
            </div>
          </div>
        </div>
        <div class="chat-content">
          {this.props.global.roomId ? <ChatBox /> : <Welcome /> }
        </div>

      </main>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {})(Lobby));
