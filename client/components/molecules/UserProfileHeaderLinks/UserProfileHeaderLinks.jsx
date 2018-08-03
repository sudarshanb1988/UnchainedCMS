/* @flow weak */

/*
 * Component: UserProfileHeaderLinks
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BmoPopUp, CustomNavLink } from 'components';
import { Image, Heading } from 'unchained-ui-react';
import st from 'constants/strings';
import { childOf } from 'utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './UserProfileHeaderLinks.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UserProfileHeaderLinks extends Component {
  props: {
    bookmarkAltText: '',
    bookmarkImage: '',
    bookmarkHoverImage: '',
  };

  toggleUserProfileMenu = () => {
    const showUserProfileMenu = !this.state.showUserProfileMenu;
    this.setState({ showUserProfileMenu, showBookMarkMenu: false });
  }
  toggleBookMarkMenu = () => {
    const showBookMarkMenu = !this.state.showBookMarkMenu;
    this.setState({ showBookMarkMenu, showUserProfileMenu: false });
  }

  handleMouseUp = (e) => {
    if (e.target.className && e.target.className.baseVal && !(e.target.className.baseVal.indexOf('pop-up-element') > -1)) { // IE11 baseVal
      this.setState({ shouldShowLogoutMsgModal: false });
    }
    if (window.innerWidth <= 1024) {
      if (!(childOf(e.target, document.querySelector('#user-profile-header-mobile'))
        || childOf(e.target, document.querySelector('#user-book-mark-header-mobile')))
        || (e.target.id === 'profileImageBtn')) {
        this.setState({ showUserProfileMenu: false, showBookMarkMenu: false });
      }
    }
  }
  componentWillMount = () => {
    document.body.addEventListener('mousedown', this.handleMouseUp);
    document.body.addEventListener('touchstart', this.handleMouseUp);
  }
  componentWillUnmount = () => {
    document.body.removeEventListener('mousedown', this.handleMouseUp);
    document.body.removeEventListener('touchstart', this.handleMouseUp);
  }

  state = {
    showBookMarkMenu: false,
    bookmarksData: [],
  }

  closeBookmarksMenu = () => {
    this.setState({ showBookMarkMenu: false });
  }

  renderBookmarkdiv() {
    const { bookmarksData } = this.state;
    if (bookmarksData.length) {
      bookmarksData.sort((a, b) => {
        const c = new Date((a._source && a.created_at) || a.added_at);
        const d = new Date((b._source && b.created_at) || b.added_at);
        return d - c;
      });
    }

    return (
      <div className={'popup-text-content'}>
        { (bookmarksData.length > 0 ?
          <div className="user-book-mark-menu">
            <ul>
              {
                Object.assign([], bookmarksData).splice(0, 3).map(bookmark => {
                  return (
                    <li className="profile-icon-sub-links">
                      {bookmark._source ?
                        <CustomNavLink
                          className="pop-up-element"
                          to={bookmark._source.historical_publication ? bookmark._source.radar_link : `/research/${bookmark._source.product_id}/`}
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => {}}
                          onClick={this.closeBookmarksMenu}
                          isHistoricalPublication={bookmark._source.historical_publication}
                          radarLink={bookmark._source.historical_publication ? bookmark._source.radar_link : ''}
                        >
                          {bookmark._source.title}
                        </CustomNavLink>
                        :
                        <NavLink
                          className="pop-up-element"
                          to={'/profile/bookmarks/'}
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => {}}
                          onClick={this.closeBookmarksMenu}
                        >
                          {bookmark.event_title}
                        </NavLink>
                      }
                    </li>
                  );
                })
              }
              <li className="profile-icon-sub-links log-out-link">
                <NavLink
                  className={'pop-up-element'}
                  to={'/profile/bookmarks/'}
                  onClick={this.closeBookmarksMenu}
                >
                  See All Bookmarks
                </NavLink>
              </li>
            </ul>
          </div>
          :
          <div div className="user-book-mark-menu length-zero">
            <Heading as={'h3'} content={'Welcome to your bookmarks menu.You can archive any research you find interesting here for easy reference in the future.'} />
            <Heading as={'h3'} content={'Just click on the bookmark icon located near the title of the publication and it will appear here.'} />
          </div>)
        }
      </div>
    );
  }

  render() {
    const {
      bookmarkAltText,
      bookmarkImage,
      bookmarkHoverImage,
    } = this.props;
    const { showBookMarkMenu, bookmarksData, } = this.state;

    return (
      <div className="user-profile-header-links" id="user-profile-header-links">
        <div className="user-prof-short-cut-icons">
          <a className={`user-bookmark ${showBookMarkMenu.toString()}`} title={st.userbookmark} role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => this.handleNavClick('Bookmarks')}>
            {this.state.showBookMarkMenu ?
              <span className="active-back-side pop-up-element" />
              : null
            }
            {
              bookmarksData.length > 0 ?
                <span className="notification-circle text-ellipsis" onClick={() => this.toggleBookMarkMenu()} tabIndex={0} onKeyPress={() => {}} role="button">
                  {bookmarksData.length <= 9 ? bookmarksData.length : '9+'}
                </span>
                : null
            }
            <span onClick={() => this.toggleBookMarkMenu()} onKeyPress={() => {}} role="button" tabIndex={0}>
              <Image className="pop-up-element" onFocus={() => {}} alt={bookmarkAltText} src={bookmarkImage} />
              <Image className="pop-up-element on-hover" onFocus={() => {}} alt={bookmarkAltText} src={bookmarkHoverImage} />
            </span>
            {!(window.innerWidth <= 1024) ?
              <BmoPopUp
                alsoOnMobile={true}
                debug={false}
                showOnClickOrHover={true}
                actLeftBuff={-25}
                actTopBuff={0}
                backgroundColor="#004a7c"
              >
                {this.renderBookmarkdiv()}
              </BmoPopUp>
              :
              <div className={'mobile-view'} id={'user-book-mark-header-mobile'}>
                {showBookMarkMenu ? this.renderBookmarkdiv() : null}
              </div>
            }
          </a>
        </div>
      </div>
    );
  }
}

export default UserProfileHeaderLinks;
