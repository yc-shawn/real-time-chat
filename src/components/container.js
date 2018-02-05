import React, { Component } from 'react';
import { connect } from "react-redux";
import { Paper } from 'react-md';

import { chooseRoom } from '../actions/room.action';

class Container extends Component {
  constructor(){
    super();
    this.state = { zoomed: false }
  }
  zoom(zoomed){
    this.setState({zoomed});
  }
  render(){
    return (
      <Paper zDepth={2} class={`main-content ${this.state.zoomed ? 'fullscreen': 'container'}`}>
        <header class="main-header d-flex justify-content-between">
          <span class="header-action">
            <i class="fa fa-circle" onClick={() => this.props.chooseRoom(null)}/>
            <i class="fa fa-circle" onClick={() => this.zoom(false)}/>
            <i class="fa fa-circle" onClick={() => this.zoom(true)}/>
          </span>
          <a class="logo-container" href={ENV.link.homepage}>
            <img src={`${ENV.assets}images/ychen-logo-dark.png`} />
          </a>
        </header>
        { this.props.children }
      </Paper>
    )
  }
}

export default connect(null, {chooseRoom})(Container);
