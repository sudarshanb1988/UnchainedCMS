/* @flow weak */

/*
 * Component: MegaMenu
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Image, Button, Grid } from 'unchained-ui-react';
import { pushToDataLayer } from 'analytics';
import { mapPropsToChildren } from 'utils/reactutils';
import st from 'constants/strings';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './MegaMenu.scss';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class MegaMenu extends Component {
  props: {
    megaMenuText: '',
    megaMenuIconModal: '',
    megaMenuIconModalAltText: '',
    megaMenuIconHeaderAltText: '';
    mobileHamburgerIconHeader: '';
    children: {}
  };

  static defaultProps = {
  };

  state = {
    isMegaMenuOpen: false
  };
  handleEscape = (e) => {
    if (e.which === 27) {
      const closeButton = document.getElementById('mega-menu-close-icon');
      if (closeButton) {
        closeButton.click();
      }
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleEscape);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }
  closeMegaMenu = () => {
    this.setState({ isMegaMenuOpen: false });
    document.body.classList.remove('noscroll');
  }
  megaMenuOpen = () => {
    window.scrollTo(0, 0);
    this.setState({ isMegaMenuOpen: true });
    document.body.classList.add('noscroll');
    pushToDataLayer('common', 'topMenuNav', { label: 'Menu' });
  }

  render() {
    const {
      megaMenuIconModal,
      megaMenuText,
      megaMenuIconModalAltText,
      mobileHamburgerIconHeader,
      megaMenuIconHeaderAltText,
      children
    } = this.props;
    return (
      <div className="mega-menu-container">
        <Image className="desktop" onClick={this.megaMenuOpen} alt={megaMenuIconModalAltText} src={megaMenuIconModal} title={st.megamenu} />
        <Image id="mobileHamburgerMenu" className="mobile" onClick={this.megaMenuOpen} alt={megaMenuIconHeaderAltText} src={mobileHamburgerIconHeader} />
        <Button onClick={this.megaMenuOpen} tabIndex={0} className="menu-name white">{megaMenuText}</Button>
        {
          this.state.isMegaMenuOpen ?
            <div className={'mega-menu'} id="the-mega-menu">
              <Grid className="mega-menu-holder">
                <Grid.Row className="menu-header">
                  <Grid.Column computer={12} className="mega-menu-title">
                    <Button tabIndex={0} id="mega-menu-close-icon" className="mega-menu-close-icon bmo-close-btn bg-icon-props" onClick={this.closeMegaMenu} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="mega-menu-links-set">
                  {mapPropsToChildren(children, { closeMegaMenu: this.closeMegaMenu })}
                </Grid.Row>
              </Grid>
            </div>
            : null
        }
      </div>
    );
  }
}

export default MegaMenu;
