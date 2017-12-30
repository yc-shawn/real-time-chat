import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = { chatlist: [] }
  }
  componentDidMount(){
    firebase.database().ref('chatapp/chatroom/').on('child_added', (snapshot)=>{
      var list = snapshot.val();
      var newList = this.state.chatlist;
      newList.push(list)
      if (list != null){
        this.setState({ chatlist: newList });
      }
      console.log(this.state.chatlist);
    });
  }
  render(){
    return (
      <div className="main-content">
        <List key="rooms" className="navItemsList">
          <Subheader primaryText="Rooms List" />
          {this.state.chatlist.map((room, index) =>
            <Link key={room.id} to={`/room/${room.id}`}>
              <ListItem
                leftAvatar={<Avatar icon={<FontIcon>chat</FontIcon>} />}
                primaryText={room.name}
                secondaryText={`members: ${room.users.length}`}
                rightIcon={<FontIcon>info</FontIcon>}
                style={{paddingLeft: 0}}
              />
            </Link>
          )}
        </List>
      </div>
    )
  }
}

export default connect(null, {})(RoomList);
