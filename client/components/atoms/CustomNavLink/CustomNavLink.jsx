/* @flow weak */

/*
 * Component: CustomNavLink
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'unchained-ui-react';
import {
  GET_RESEARCH_LAYOUT_META_DATA,
  USER_AUTH_SIGN_IN_CLICKED,
  CLEAR_ERROR_MESSAGE,
  SET_RESEARCH_LAYOUT_META_DATA
} from 'store/actions';

import {
  researchSelector,
  userSelector,
} from 'store/selectors';
import { withRouter } from 'react-router';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './CustomNavLink.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class CustomNavLink extends Component {
  props: {
    isHistoricalPublication: bool,
    children: {},
    onSignInClick: () => void,
    isAuthenticated: bool,
    researchLayoutData: {},
    getResearchLayoutData: () => void,
    radarLink: '',
    resetResearchLayoutData: () => void,
    onClick: () => void,
    history: {
      push: () => void
    }
  };

  static defaultProps = {
  };

  state = {
    showModal: false,
    messageModalOpen: true,
    researchLayoutData: {},
    idxnextProps: ''
  };

  componentDidMount() {
    // Component ready
  }

  componentWillMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnMount() {
    this.props.resetResearchLayoutData();
    document.removeEventListener('keydown', this.closeModal);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.researchLayoutData && Object.keys(nextProps.researchLayoutData)) {
      this.setState({ researchLayoutData: Object.assign({}, nextProps.researchLayoutData) });
    } else {
      this.setState({ researchLayoutData: {} });
    }
  }

  handleOnClick = (e, props = this.props) => {
    if (e) e.preventDefault();
    this.props.resetResearchLayoutData();
    const { onClick, isAuthenticated, getResearchLayoutData, radarLink } = props;

    if (onClick) {
      onClick();
    }
    if (isAuthenticated === false) {
      this.dispatchLoginAction('You must be logged in / registered to view this content.');
      return;
    }

    this.setState({ messageModalOpen: true, radarLink }, () => {
      getResearchLayoutData(radarLink ? radarLink.replace('/api/v1', '/publication') : '');
    });
  }

  dispatchLoginAction = (msg) => {
    window.scrollTo(0, 0);
    this.props.onSignInClick(msg);
  }

  getHTMLToRender() {
    const { isHistoricalPublication, children } = this.props;

    if (isHistoricalPublication) {
      return (
        <NavLink
          {...this.props}
          onClick={(e) => this.handleOnClick(e)}
          to=""
        >
          {children}
        </NavLink>
      );
    }
    return <NavLink {...this.props}>{children}</NavLink>;
  }

  closeModal = (e) => {
    if (e.keyCode === 27) {
      this.closeMessageModal();
    }
  }

  closeMessageModal = () => {
    this.setState({ messageModalOpen: false, radarLink: '' }, () => {
      this.props.resetResearchLayoutData();
    });
  }

  grantAccessToReadContent = () => {
    const { researchLayoutData } = this.state;
    if (researchLayoutData.yes_link) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.target = '_blank';
      a.href = `${window.location.origin}/api/v1${researchLayoutData.yes_link}`;
      if (navigator.userAgent.toLowerCase().match(/(ipad|ipod|iphone|safari)/) && navigator.userAgent.search('Chrome') < 0) {
        document.location = a.href;
      } else {
        a.click();
      }
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
      // window.open(`${window.location.origin}/api/v1${researchLayoutData.yes_link}`, '_blank');
      this.closeMessageModal();
    } else if (researchLayoutData.videocast_link) {
      this.props.history.push(researchLayoutData.videocast_link);
    }
  }

  getPublicationAccessWarningMsg() {
    const { researchLayoutData } = this.state;
    return (
      <div className="customWarningMsgModal">
        <div className="closeButtonHolder">
          <Button tabIndex={0} className="modal-close-icon bmo-close-btn bg-icon-props" onClick={this.closeMessageModal} aria-label="Close Modal" />
        </div>
        <div>
          {researchLayoutData.message}
        </div>
        <div className="actionButtons">
          <Button onClick={this.closeMessageModal} secondary content="No" />
          <Button secondary content="Yes" onClick={this.grantAccessToReadContent} />
        </div>
      </div>
    );
  }

  getMessageModal() {
    const { messageModalOpen, researchLayoutData } = this.state;
    if (researchLayoutData.show_modal && messageModalOpen) {
      let content = null;
      if (researchLayoutData.type === 'PENDING_CAN_READ') {
        content = this.getPublicationAccessWarningMsg();
      } else {
        content = (
          <div className="customWarningMsgModal">
            <div className="closeButtonHolder">
              <Button tabIndex={0} className="modal-close-icon bmo-close-btn bg-icon-props" onClick={this.closeMessageModal} aria-label="Close Modal" />
            </div>
            {researchLayoutData.message}
            <br />
            Please contact us for more information.
            <div className="image-link-div-wrapper">
              <div className="image-link-div ">
                <div title="Email" className="forgot-email-template-image forgot-mail-icon" />
                <a title="contact@bmo.com" href="mailto:contact@bmo.com" className={'forgot-email-template-label email'}>contact@bmo.com</a>
              </div>
              <div className="image-link-div">
                <div title="Call" className="forgot-email-template-image forgot-phone-icon" />
                <a title="+1(713)547-0812" href="tel:+1(713)547-0812" className={'forgot-email-template-label'}>+1 (713) 547-0812</a>
              </div>
            </div>
            <div>
              <Button className="closeBtn" tabIndex={0} secondary onClick={this.closeMessageModal} content="Close" />
            </div>
          </div>
        );
      }
      return <div className="customnavlinMessageHolder">{content}</div>;
    } else if (researchLayoutData.show_modal === false && researchLayoutData.yes_link && messageModalOpen) {
      this.grantAccessToReadContent();
    } else if (researchLayoutData.show_modal === false && researchLayoutData.videocast_link) {
      this.props.history.push(researchLayoutData.videocast_link);
    }
    return null;
  }

  render() {
    const htmlToRender = this.getHTMLToRender();
    const msgModal = ((this.state.radarLink === this.props.radarLink) ? this.getMessageModal() : null);

    return (
      <span className="custom-nav-link">
        {htmlToRender}
        {msgModal}
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  researchLayoutData: researchSelector.getResearchLayoutMetaData(state),
  isAuthenticated: userSelector.getIsLoggedIn(state),
  profile: userSelector.getUserProfileInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  getResearchLayoutData: (url = '') => {
    dispatch(GET_RESEARCH_LAYOUT_META_DATA(url));
  },
  onSignInClick: (msg) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
    dispatch({ type: USER_AUTH_SIGN_IN_CLICKED, data: msg });
  },
  resetResearchLayoutData: () => {
    dispatch({ type: SET_RESEARCH_LAYOUT_META_DATA, data: {} });
  }

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomNavLink));
