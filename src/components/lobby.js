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
    if (_.isEmpty(this.props.user)){
      this.props.history.push('/signin')
    } else {
      db.lobby.on('value', (snapshot) => {
        this.setState({ lobby: snapshot.val() });
      })
      db.chatList.on('value', (snapshot)=>{
        if (snapshot.val()){
          var chatList = _.values(snapshot.val());
          this.setState({ chatList });
        };
      });
    }
  }
  render(){
    var { user } = this.props;
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
              <span class="text-capitalize">{`${user.firstname} ${user.lastname}`}</span>
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
