/* @flow weak */

/*
 * Component: HeroBannerRichText
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Button } from 'unchained-ui-react';
import truncate from 'lodash/truncate';
import { RichText } from 'components';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './HeroBannerRichText.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class HeroBannerRichText extends Component {
  props: {
    headingRichText: '',
    content: '',
  };

  static defaultProps = {
  };

  state = {
    displayMore: false,
    contentLength: 0,
  };

  componentWillMount() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
      this.setState({ contentLength: 170 });
    } else if (windowWidth > 480 && windowWidth <= 700) {
      this.setState({ contentLength: 240 });
    } else if (windowWidth > 700 && windowWidth <= 992) {
      this.setState({ contentLength: 320 });
    } else if (windowWidth > 992 && windowWidth <= 1024) {
      this.setState({ contentLength: 230 });
    } else if (windowWidth > 1024) {
      this.setState({ contentLength: 320 });
    }
  }

  render() {
    const { headingRichText, content } = this.props;
    const { displayMore, contentLength } = this.state;
    return (
      <div className="hero-banner-rich-text">
        <div className="hero-banner-rich-text-container">
          <div className="hero-banner-richText-header"><RichText richText={headingRichText} /></div>
          {content.length < contentLength ? (
            <p className="hero-banner-rich-text-content">{content}</p>
          ) : (
            <div>
              {displayMore ? (
                <p
                  className="hero-banner-rich-text-content"
                >
                  {content}
                </p>
              ) : (
                <p
                  className="hero-banner-rich-text-content"
                >
                  {`${truncate(content, { length: contentLength })}`}
                </p>
              )}
            </div>
          )}
          {displayMore ? (
            <Button
              className="blue-angle-icon active"
              onClick={() => this.setState({ displayMore: false })}
            >{''}</Button>
          ) : (
            <Button
              className="blue-angle-icon"
              onClick={() => this.setState({ displayMore: true })}
            >
              {''}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default HeroBannerRichText;
