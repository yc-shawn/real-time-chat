import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { BottomNavigation, FontIcon } from 'react-md';

class Footer extends Component {
  constructor(props){
    super(props);
  }
  handleNavChange(activeIndex){
    switch (activeIndex) {
      case 2:
        this.props.route.history.push('/room')
        break;
      case 1:
        this.props.route.history.push('/rooms')
        break;
      case 0:
      default:
        this.props.route.history.push('/')
        break;
    }
  };

  render(){
    return (
      <div>
        <BottomNavigation
          colored
          dynamic={true}
          onNavChange={this.handleNavChange.bind(this)}
          links={[
            {
              label: 'Home',
              icon: <FontIcon iconClassName="fa fa-home" />,
            }, {
              label: 'Rooms',
              icon: <FontIcon iconClassName="fa fa-comments" />,
            }, {
              label: 'Chat',
              icon: <FontIcon iconClassName="fa fa-commenting" />,
            }
          ]}
        />
      </div>
    )
  }
}

export default connect(null, {})(Footer);
