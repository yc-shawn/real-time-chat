import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardTitle, CardText, BottomNavigation, FontIcon, TextField, Button } from 'react-md';

import { userLogin } from '../actions/user.action';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      name: 'anonymous',
      login: false,
      alert: ''
    }
  }
  login(){
    let userName = this.refs.userName.value;
    this.props.userLogin(userName);
    if (userName.length > 0){
      this.setState({ name: userName, login: true })
    } else {
      console.log('please input your name')
    }
  }
  createRoom(){
    let userName = this.state.name;
    let roomName = this.refs.roomName.value;
    if (userName.length > 0){
      if (this.state.login){ // intputStr = room name
        this.setState({alert: ''})
        let newRoom = {
          name: roomName,
          id: new Date().getTime().toString(),
          num: 1,
          messages:[{
            name: userName,
            msg: `I create the room: ${roomName}. Let\'s chat!'`,
            time: firebase.database.ServerValue.TIMESTAMP
          }],
          users:[{
            name: userName,
            num: 1
          }]
        };
        firebase.database().ref('chatapp/chatroom/').push(newRoom);
        if (!env.DEBUG) firebase.database().ref('chatapp/roomlog/').push(new Date().toString());
      }
    }
  }

  render(){
    return (
      <div >
        <Card className="main-content">
          <CardTitle
            title="Real-time Web Chat Application"
            subtitle="by yuxiang chen(shawn)" />
          <CardText>
            <p>This is online chat web application, You can login with your name and create or enter a room to start chatting with other people!</p>
            <div className="text-center">
              <div className="mb-3">
                {this.state.login ?
                  <div>
                    <TextField
                      id="home-enter-name"
                      label="please enter the topic"
                      type="text"
                      leftIcon={<FontIcon>chat</FontIcon>}
                      size={35}
                      fullWidth={false}
                      ref="roomName"
                    />
                    <p>
                      <small>Now you can create your own room or enter the room in the room list</small>
                    </p>
                  </div>
                  :
                  <TextField
                    id="home-enter-name"
                    label="please enter your name"
                    type="text"
                    leftIcon={<FontIcon>people</FontIcon>}
                    size={35}
                    fullWidth={false}
                    ref="userName"
                  />
                }
              </div>
              <div>
                {this.state.login ?
                  <Button raised primary iconClassName="fa fa-paper-plane" onClick={() => this.createRoom()}>Create!</Button>
                  :
                  <Button raised primary iconClassName="fa fa-paper-plane" onClick={() => this.login()}>Start!</Button>
                }
              </div>

            </div>

          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(null, { userLogin })(Home);
