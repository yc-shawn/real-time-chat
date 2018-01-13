import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { chooseRoom } from '../actions/room.action';

class ChatListItem extends Component {
  constructor(props){
    super(props);
  }
  chooseRoom(){
    this.props.chooseRoom(this.props.room.id)
  }
  render(){
    let props = this.props;
    return !props.room ? null : (
      <li class={`chat-list-item d-flex justify-content-between align-items-center
                  ${props.room.id === props.global.roomId ? 'hl-item':''}`}
          onClick={()=>this.chooseRoom()}>
        <span>
          <span class="chat-status">
            <i class={`fa fa-${props.lobby ? 'users' : 'comment-o'}`} />
          </span>
          <span class="chat-name">{props.room && props.room.name}</span>
        </span>
        {!props.lobby && <i class="fa fa-times chat-close" />}
      </li>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, global: state.global }
}

export default withRouter(connect(mapStateToProps, {chooseRoom})(ChatListItem));
