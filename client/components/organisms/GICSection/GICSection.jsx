/* @flow weak */

/*
 * Component: BmoResearch
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { pushToDataLayer } from 'analytics';
import { NavLink } from 'react-router-dom';
import st from 'constants/strings';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { RichText } from 'components';
import './GICSection.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class GICSection extends Component {
  props: {
    children: {},
    data: []
  };

  state = {
    // Initialize state here
  };

  componentDidMount() {
    // Component ready
  }
  handleNavClick = () => {
    pushToDataLayer('ourdepartment', 'viewAllCoverage');
  }
  render() {
    const { children, data } = this.props;
    const richText = data[0].value.richText;
    const to = {};
    const buttonText = '';

    return (
      <div className={`bmo-research ${buttonText ? 'ourdept' : ''}`}>
        <RichText richText={richText} />
        <div className="gic-cards-wrapper">
          {children}
          {
            buttonText ?
              <div className="button-holder">
                <NavLink to={(to && to.url) || '/'} onClick={this.handleNavClick} className="link-buttons ui secondary button" title={st.showMore} >{buttonText}</NavLink>
              </div>
              : null
          }
        </div>
      </div>
    );
  }
}

export default GICSection;
