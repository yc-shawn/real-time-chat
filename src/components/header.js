import React, { Component } from 'react';
import { connect } from "react-redux";
import { Toolbar, Button, MenuButton, Drawer, List, ListItem, Divider, Avatar, FontIcon, Subheader } from 'react-md';

import MemberList from './memberList';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      drawer: false,
      inRoom: false,
      chatlist: []
    }
  }
  componentDidMount(){
    firebase.database().ref('chatapp/chatroom/').on('child_added', (snapshot)=>{
      var list = snapshot.val();
      var newList = this.state.chatlist;
      newList.push(list)
      if (list !== null){
        this.setState({ chatlist: newList });
      }
      console.log(this.state.chatlist);
    });
    // window.addEventListener("beforeunload", (event) => {
    //   // event.preventDefault();
    //   alert('close');
    // });
    $(window).bind('beforeunload', (e) => {
      alert('Bye.');
      console.log('bye');
      return 'hey';
    });
  }
  toggleDrawer(){
    this.setState({ drawer: !this.state.drawer })
  }
  drawVisibility(drawer){
    this.setState({ drawer })
  }
  render(){
    return (
      <header>
        <Toolbar
          colored
          actions={
            !this.props.route.location.pathname.startsWith('/room/') ? null :
            <Button icon primary iconClassName="fa fa-bars" onClick={() => this.toggleDrawer()}/>
          }
          title="Chat App"
        />
        <Drawer
          id="header-room-list-drawer"
          style={{left: "auto", width: "280px"}}
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={this.state.drawer}
          position="right"
          onVisibilityChange={this.drawVisibility.bind(this)}
          header={(
            <Toolbar nav={<Button icon primary iconClassName="fa fa-arrow-right" onClick={() => this.toggleDrawer()}/>}/>
          )}
          navItems={[
            <Divider key="divider"/>,
            <MemberList key="member-list" history={this.props.route.history}/>
          ]}
        />
      </header>
    )
  }
}

export default connect(null, {})(Header);
