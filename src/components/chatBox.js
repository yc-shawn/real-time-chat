import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <div class="chat-box">
        <section class="chat-msg-container">
          <ul class="chat-show-msg">
            <li class="chat-box-other" key={99}>
              <div class="chat-name">Steve Jobs</div>
              <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
              <div class="chat-bubble">Message from others Message from others Message from others Message from others Message from others Message from others Message from others Message from others Message from others</div>
            </li>
            <li class="chat-box-me" key={66}>
              <div class="chat-name">Shawn Chen</div>
              <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
              <div class="chat-bubble">Message from me</div>
            </li>
            {/*
              this.state.roomObj === null ? null :
              this.state.roomObj.messages.map((message, i) => {
                const chatClass = this.props.user.name === message.name ? 'chat-box-me' : 'chat-box-other'
                return (
                  <li className={chatClass} key={i}>
                    <div class="chat-name">{message.name}</div>
                    <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
                    <div class='chat-bubble'>{message.msg}</div>
                  </li>
                )
              })
            */}
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
  return { user: state.user, room: state.room }
}

export default withRouter(connect(mapStateToProps, {})(Lobby));
