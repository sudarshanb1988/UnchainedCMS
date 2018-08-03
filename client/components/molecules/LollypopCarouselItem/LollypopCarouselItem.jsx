/* @flow weak */

/*
 * Component: LollypopCasouselItem
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Button, Icon } from 'unchained-ui-react';
import { RichText } from 'components';
import { NavLink } from 'react-router-dom';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './LollypopCasouselItem.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class LollypopCasouselItem extends Component {
  props: {
    richText: '',
    learMoreText: '',
    to: '',
    backgroundImage: '',
    lollopopColor: '',
    isPlayIcon: bool
  };

  static defaultProps = {
  };

  state = {
    // Initialize state here
  }

  componentDidMount() {
    // Component ready
  }

  renderInternalLink = (url, text, isPlay) => {
    if (isPlay) {
      return (
        <NavLink a={{ 'aria-label': 'Navlink link' }} className="video-cast" to={url || '/'}>
          <Button primary className={'play-icon'}>{text}<Icon name={'caret right'} size={'big'} /></Button>
        </NavLink>
      );
    }
    return (
      <NavLink a={{ 'aria-label': 'Navlink link' }} className="learn-more" to={url || '/'}>
        {text}
      </NavLink>
    );
  }

  renderGeneralLink = (target, url, text, isPlay) => {
    return (
      <div>
        {
          !isPlay ?
            <a aria-label={'Navlink link'} className="learn-more" target={target} href={url}>
              {text}
            </a>
            :
            <a aria-label={'Navlink link'} className="learn-more" target={target} href={url}>
              <Button primary className={'play-icon'}>{text}<Icon name={'caret right'} size={'big'} /></Button>
            </a>
        }
      </div>
    );
  }


  render() {
    const { richText, learMoreText, to, backgroundImage, lollopopColor, isPlayIcon } = this.props;
    return (
      <div className={'lollypop-casousel-item sub-page'}>
        <div className="banner" style={{ background: `url(${backgroundImage})` }}>
          <div className="lollypop-circle" style={{ backgroundColor: lollopopColor }}>
            <div className="centerAlignVertical">
              <RichText richText={richText} />
              {
                to.url && (
                  (to.link_target !== 'newTab') ?
                    this.renderInternalLink(to.url, learMoreText, isPlayIcon)
                    :
                    this.renderGeneralLink(to.target, to.url, learMoreText, isPlayIcon)
                )
              }
            </div>
          </div>
          <div className="lollypop-circle-outer" />
        </div>
      </div>
    );
  }
}

export default LollypopCasouselItem;
