/* @flow weak */

/*
 * Component: PageLogo
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Image, Heading, Container } from 'unchained-ui-react';
import { NavLink } from 'react-router-dom';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './PageLogo.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class PageLogo extends Component {
  props: {
    altText: '',
    pageTitle: '',
    image: '',
    backButtonText: '',
    to: {},
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
    const { altText, image, pageTitle, backButtonText, to } = this.props;
    return (
      <Container className="page-logo">
        {
          image ?
            <div className="image">
              <Image className="logo-img" src={image} alt={altText} />
            </div>
            : null
        }
        <Heading className={image ? 'logo-text' : 'logo-text no-padding-left'}>{pageTitle}</Heading>
        {backButtonText && to.url ?
          <div className="back-link-holder">
            <NavLink className="back-link" to={to.url}>
              <span className="bmo_chevron left" />
              {backButtonText}
            </NavLink>
          </div>
          :
          null
        }
      </Container>
    );
  }
}

export default PageLogo;
