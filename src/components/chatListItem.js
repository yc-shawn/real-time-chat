import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { chooseRoom } from '../actions/room.action';

import db from '../utilities/db';

class ChatListItem extends Component {
  constructor(props){
    super(props);
  }
  chooseRoom(){
    this.props.chooseRoom(this.props.room.id)
  }
  closeRoom(){
    db.chatList.orderByChild('id').equalTo(this.props.room.id).limitToFirst(1).once('value', (res) => {
      db.chatList.child(_.keys(res.val())[0]).remove();
    });
  }
  render(){
    let props = this.props;
    return !props.room ? null : (
      <li class={`chat-list-item d-flex justify-content-between align-items-center
                  ${props.room.id === props.global.roomId ? 'hl-item':''}`}>
        <span class="chat-item-info" onClick={()=>this.chooseRoom()}>
          <span class="chat-status">
            <i class={`fa fa-${props.lobby ? 'users' : 'comment-o'}`} />
          </span>
          <span class="chat-name">{props.room && props.room.name}</span>
        </span>
        {!props.lobby &&
          <span class="chat-close" onClick={()=>this.closeRoom()}>
            <i class="fa fa-times"/>
          </span>}
      </li>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {chooseRoom})(ChatListItem));
