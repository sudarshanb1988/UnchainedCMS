/* @flow weak */

/*
 * Component: FeaturedResearchComponent
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Image, List, Segment } from 'unchained-ui-react';
import { NavLink } from 'react-router-dom';
import { pushToDataLayer } from 'analytics';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { RichText } from 'components';
import './FeaturedResearchComponent.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class FeaturedResearchComponent extends Component {
  props: {
    data: [],
  };

  state = {
  };

  componentDidMount() {
  }

  handleLinkClick = (sectionTitle) => {
    pushToDataLayer('home', 'researchOptionsLink', { label: sectionTitle });
  }
  getFormattedText = (text) => {
    if (!text) return text;
    const splitArr = text.split(' ');
    if (splitArr.length === 2) {
      return (
        <span>
          {splitArr[0]}<br />
          {splitArr[1]}
        </span>
      );
    }
    return text;
  }

  render() {
    const { data } = this.props;
    const { sectionTitle, imageVal, navImage, sectionDescription } = data;
    const to = {};

    const markup = (
      <Segment textAlign="center" basic>
        <List className="list-wrap">
          <List.Item className="title section-title"><span>{this.getFormattedText(sectionTitle.text)}</span></List.Item>
          <List.Item className="component-image-holder">
            <Image className="component-image" height={72} src={imageVal.url} alt={imageVal.altText} title={imageVal.altText} />
          </List.Item>
          <List.Item className="description"><RichText richText={sectionDescription.richText} /></List.Item>
          <Image className="link-imag" width={42} src={navImage.image} alt={`${navImage.altText} to ${sectionTitle.text}`} title={`${navImage.altText} to ${sectionTitle.text}`} />
        </List>
      </Segment>
    );
    return (
      <Segment.Group horizontal className="featured-research-component">
        {
          to.url !== 'newTab' ?
            <NavLink className="to-link" onClick={() => this.handleLinkClick(sectionTitle.text)} to={to.url || '/'}>
              {markup}
            </NavLink>
            :
            <a className="to-link" rel="noopener noreferrer" onClick={() => this.handleLinkClick(sectionTitle.text)} href={to.url || '/'} target="_blank">
              {markup}
            </a>
        }
      </Segment.Group>
    );
  }
}

export default FeaturedResearchComponent;
