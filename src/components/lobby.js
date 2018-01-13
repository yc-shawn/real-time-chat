import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';

import ChatListItem from './chatListItem';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = { memberList: [] }
  }
  render(){
    return (
      <main class="lobby d-flex align-items-stretch">
        <div class="chat-list d-flex flex-column justify-content-between">
          <ul class="list-content">
            <li>
              <span class="chat-status">
                <i class="fa fa-users" />
              </span>
              <span class="chat-name">Lobby</span>
            </li>
            <li>
              <span class="chat-status">
                <i class="fa fa-comment-o" />
              </span>
              <span class="chat-name">user 1</span>
            </li>
            <ChatListItem />
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
        <div class="chat-box">
          <header class="chat-header"></header>
          <section class="input-box">
            <input type="text" placeholder="Please enter your message"/>
            <Button flat primary swapTheming class="send-btn m-0">
              <i class="fa fa-paper-plane" />
            </Button>
          </section>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, room: state.room }
}

export default withRouter(connect(mapStateToProps, {})(Lobby));
