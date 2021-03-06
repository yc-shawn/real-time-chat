import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';
import db from '../utilities/db';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {room: null, key: null};
  }
  componentDidMount(){
    this.getRoom();
  }
  getRoom(id){
    const roomId = id || this.props.global.roomId;
    if (roomId === 'lobby'){
      db.lobby.on('value', (res) => {
        this.setState({ room: res.val() });
        this.scrollToBottom();
      })
    } else {
      db.chatList.orderByChild('id').equalTo(roomId).limitToFirst(1).on('value', (res) => {
        this.setState({ room: _.values(res.val())[0], key: _.keys(res.val())[0] });
        this.scrollToBottom();
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.global && nextProps.global.roomId !== this.props.global.roomId){
      this.getRoom(nextProps.global.roomId);
    }
  }
  sendMsg(){
    let message = this.refs.message.value;
    const roomId = this.props.global.roomId;
    const refUrl = roomId === 'lobby' ? db.lobby : db.chatList.child(this.state.key);
    refUrl.child('msgs/').push({
      userId: this.props.user.id,
      name: this.props.user.name,
      msg: message,
      time: firebase.database.ServerValue.TIMESTAMP
    }, () => {
      this.refs.message.value = '';
    });
    this.scrollToBottom();
  }
  scrollToBottom(){
    var target = $('.chat-show-msg li:last-of-type');
    $(() => {
      if (target && target.offset()){
        $('html .chat-msg-container').animate({
          scrollTop: target.offset().top + $('.chat-show-msg')[0].scrollHeight
        }, 333);
      }
    })
  }
  onKeyDown(e){
    if (e.keyCode === 13) this.sendMsg();
  }
  render(){
    return !this.state.room ? null : (
      <div class="chat-box">
        <section class="chat-msg-container">
          <ul class="chat-show-msg">
            {_.values(this.state.room.msgs).map((msg, i) =>
              <li class={this.props.user.id === msg.userId ? 'chat-box-me' : 'chat-box-other'} key={i}>
                <div class="chat-name text-capitalize">{msg.name}</div>
                <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
                <span class="chat-time">{moment(msg.time).format('hh:mm A')}</span>
                <div class='chat-bubble'>{msg.msg}</div>
              </li>
            )}
          </ul>
        </section>
        <section class="input-box">
          <input type="text" ref="message" placeholder="Please enter your message" onKeyDown={(e)=>this.onKeyDown(e)}/>
          <Button flat primary swapTheming class="send-btn m-0" onClick={()=>this.sendMsg()}>
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
