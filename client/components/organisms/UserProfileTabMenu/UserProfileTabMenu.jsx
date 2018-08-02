/* @flow weak */

/*
 * Component: UserProfileTabMenu
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './UserProfileTabMenu.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UserProfileTabMenu extends Component {
  props: {
    // Prop types go here
  };

  static defaultProps = {
  };

  state = {
    // Initialize state here
  };

  componentDidMount() {
    // Component ready
  }

  render() {
    return (
      <div className="user-profile-tab-menu">
        <h2>[UserProfileTabMenu]</h2>
        <h5>Its a placeholder for the component. [100% x 150px]</h5>
        <span className="file-name"> organism/UserProfileTabMenu.jsx </span>
        <div className="expanded-tab">
          Yoo Bro Your tab will expand here for following components<br />
          <b>1. Account<br />2. Consumption<br />3. Email Preference<br />4. Bookmarks<br />5. Following<br />6. Calendar </b>
        </div>
      </div>
    );
  }
}

export default UserProfileTabMenu;
