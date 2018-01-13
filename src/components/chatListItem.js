import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class ChatListItem extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <li class="d-flex justify-content-between align-items-center">
        <span>
          <span class="chat-status">
            <i class="fa fa-comment-o" />
          </span>
          <span class="chat-name">room name</span>
        </span>
        <span class="chat-close">
          <i class="fa fa-times" />
        </span>
      </li>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, room: state.room }
}

export default withRouter(connect(mapStateToProps, {})(ChatListItem));
