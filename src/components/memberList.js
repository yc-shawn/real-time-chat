import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';



class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = { memberList: [] }
  }
  componentDidMount(){
    const id = this.props.room.roomId;
    if (id){
      const rbRef = firebase.database().ref('chatapp/chatroom/');
      rbRef.orderByChild('id').equalTo(id).limitToFirst(1).on('value', (snapshot)=>{
        let room = _.values(snapshot.val())[0];
        console.log(room);
        this.setState({ memberList: room.users });
      });
    }
  }
  render(){
    console.log(this.state.memberList)
    return (
      <div className="main-content">
        <List key="rooms" className="navItemsList">
          <Subheader primaryText="Member List" />
          {this.state.memberList.map((room, index) =>
            <Link key={index} to={`/room/${room.id}`}>
              <ListItem
                leftAvatar={<Avatar icon={<FontIcon>person</FontIcon>} />}
                primaryText={room.name || ''}
                style={{paddingLeft: 0}}
              />
            </Link>
          )}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.user, room: state.room }
}

export default connect(mapStateToProps, {})(RoomList);
