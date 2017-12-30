import React, { Component } from 'react'
import { connect } from "react-redux";
import queryString from "query-string";
import { TextField, Button, FontIcon } from 'react-md';

// Actions
import { chooseRoom } from '../actions/room.action';

class Room extends Component {
  constructor(){
    super();
    this.state = { roomObj: null, key: '', id: null, message: '' };
  }
  componentDidMount(){
    let search = queryString.parse(this.props.location.search);
    let id = this.props.match.params.id || search.id;
    if (!id && this.props.room.roomId){
      this.props.history.push(`/room/${this.props.room.roomId}`);
      id = this.props.room.roomId;
    } else {
      this.props.chooseRoom(id);
    }
    this.setState({id});
    this.fetchData(id);
  }
  changeMsg(message){
    this.setState({message});
  }
  sendMsg(){
    let message = this.state.message;
    if (this.validInputStr(message)){
      const refUrl = 'chatapp/chatroom/'+this.state.key+'/messages';
      // update message
      var newMsgs = this.state.roomObj.messages;
      newMsgs.push({
        name: this.props.user.name,
        msg: message,
        time: firebase.database.ServerValue.TIMESTAMP
      })
      var update = {};
      update[refUrl] = newMsgs
      firebase.database().ref().update(update);
      this.setState({ message: '' });
      this.updateInfo(this.state.id, (room, key) => {
        let users = room.users;
        for (var i = 0; i < users.length; i++) {
          if (users[i].name === this.props.user.name) {
            users[i].num += 1;
            break;
          }
        }
        firebase.database().ref(`chatapp/chatroom/${key}/users`).set(users);
      })

      //scroll to bottom
      var target = $('.chat-show-msg li:last-child');
      $('html .chat-show-msg').animate({
        scrollTop: target.offset().top + $('.chat-show-msg')[0].scrollHeight
      }, 333);
    }
  }

  fetchData(id){
    if (id){
      const rbRef = firebase.database().ref('chatapp/chatroom/');
      let key = "", list = [];
      this.updateInfo(id, (room, key) => {
        let users = room.users || [];
        let withoutThisUser = true;
        for (var i = 0; i < users.length; i++) {
          if (users[i].name === this.props.user.name) {
            withoutThisUser = false;
            break;
          }
        }
        if (withoutThisUser) {
          users.push({name: this.props.user.name, num: 0});
          firebase.database().ref(`chatapp/chatroom/${key}/users`).set(users);
        };
      })

      rbRef.orderByChild('id').equalTo(id).limitToFirst(1).on('value', (snapshot) => {
        let room = snapshot.val();
        if (room !== null){
          let key = Object.keys(room);
          let roomObj = room[key];
          this.setState({ roomObj, key });
        }
      })
    }
  }

  updateInfo(id, callback){
    const rbRef = firebase.database().ref('chatapp/chatroom/');
    rbRef.orderByChild('id').equalTo(id).limitToFirst(1).once('value', (snapshot) => {
      let room = snapshot.val();
      if (room !== null){
        let key = Object.keys(room);
        callback(room[key], key)
      }
    })
  }

  validInputStr(){
    return true;
  }

  render(){
    if (this.props.user.name && this.state.roomObj) return (
      <section className="chat-room">
        <ul className="chat-show-msg">
          {
            this.state.roomObj === null ? null :
            this.state.roomObj.messages.map((message, i) => {
              const chatClass = this.props.user.name === message.name ? 'chat-box-me' : 'chat-box-other'
              return (
                <li className={chatClass} key={i}>
                  <div className="chat-name">{message.name}</div>
                  <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png"/>
                  <div className='chat-bubble'>{message.msg}</div>
                </li>
              )
            })
          }
        </ul>
        <div className="chat-send-msg">
          <TextField
            id="send-msg-input-field"
            lineDirection="right"
            rows={1}
            maxRows={1}
            placeholder="Enter your message"
            value={this.state.message}
            onChange={this.changeMsg.bind(this)}
            rightIcon={<Button icon primary iconClassName="fa fa-paper-plane" className="send-btn" onClick={() => this.sendMsg()}/>}
          />
        </div>
      </section>
    );
    else return (
      <section className="empty-room d-flex justify-content-center align-items-center">
        <div className={`alert alert-${this.props.user.name ? 'info' : 'danger'}`} role="alert">
          {this.props.user.name ?
            <span><i className="fa fa-info-circle mr-2" aria-hidden="true" /> You're not in the chatroom</span> :
            <span><i className="fa fa-exclamation-circle mr-2" aria-hidden="true" /> Please login in the homepage first</span>
          }
        </div>
      </section>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, room: state.room }
}

export default connect(mapStateToProps, {chooseRoom})(Room);
