/* @flow weak */

/*
 * Component: MegaMenuList
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Image } from 'unchained-ui-react';
import { NavLink } from 'react-router-dom';
import { LEFT_ARROW_CIRCLE_BIG } from 'constants/assets';
import { pushToDataLayer } from 'analytics';
import { mapPropsToChildren } from 'utils/reactutils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './MegaMenuList.scss';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class MegaMenuList extends Component {
  props: {
    text: '',
    to: '',
    children: {},
    closeMegaMenu: () => void
  };

  static defaultProps = {
  };

  state = {
    // Initialize state here
  };

  componentDidMount() {
    // Component ready
  }

  handleNavClick = (action, label) => {
    pushToDataLayer('common', 'megaMenuLinks', { action, label });
    this.props.closeMegaMenu();
  }
  getHeading = (text, to) => {
    if (to.url) {
      if (to.link_target !== 'newTab') {
        return (
          <NavLink to={to.url} onClick={() => this.handleNavClick(text, '')} className="links-card-heading">
            {text}
            <Image className={'link-go-button'} src={LEFT_ARROW_CIRCLE_BIG} />
          </NavLink>
        );
      }
      return (
        <a href={to.url} target="_blank" rel="noopener noreferrer" onClick={() => this.handleNavClick(text, '')} className="links-card-heading">
          {text}
          <Image className={'link-go-button'} src={LEFT_ARROW_CIRCLE_BIG} />
        </a>
      );
    }
    return null;
  }
  render() {
    const { to, children, closeMegaMenu } = this.props;
    // let paddingClass = 'no-padding';
    // if (!children) {
    //   paddingClass = 'padding-need';
    // }
    const parentName = this.props.text;
    return (
      <div className={`mega-menu-list ${window.unchainedSite.sitename}`}>
        {this.getHeading(parentName, to)}
        <ul className="links">
          {mapPropsToChildren(children, { closeMegaMenu, parentName })}
        </ul>
      </div>
    );
  }
}

export default MegaMenuList;
