/* @flow weak */

/*
 * Component: StickyComponentV2
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import './StickyComponentV2.scss';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class StickyComponentV2 extends Component {
  props: {
    children: {}
  };

  static defaultProps = {
  };

  state = {
    topEdgeElement: 'regular-header-section',
    topEdge: 0,
    styleObj: {},
    stickyState: 'absTop'
  };
  lastPos = 0;
  componentWillMount() {
    document.addEventListener('scroll', this.computePos);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.computePos);
    document.getElementById('layout-container').style.paddingTop = '0px';
  }
  componentDidMount() {
    const stickyBox = document.getElementById('sticky-component-ii');
    if (stickyBox) {
      const stickyBoundClint = stickyBox.getBoundingClientRect();
      if (stickyBoundClint) {
        if (stickyBoundClint.top > 110 && stickyBoundClint.bottom < window.innerHeight) {
          document.removeEventListener('scroll', this.computePos);
          document.getElementById('layout-container').style.paddingTop = '0px';
        }
      }
    }
  }
  /* eslint-disable */
  direction = () => {
    if (this.lastPos < window.pageYOffset) {
      this.lastPos = window.pageYOffset;
      return 'dn';
    }
    if (this.lastPos > window.pageYOffset) {
      this.lastPos = window.pageYOffset;
      return 'up';
    }
    return 'sm';
  }
  lastBottom = 0;
  computePos = () => {
    const stickyBox = document.getElementById('sticky-component-ii');
    const topEdge = document.getElementById(this.state.topEdgeElement);
    const footerBenchMark = document.getElementById('footer-scroll-benchmark');
    const rightLayoutBookMark = document.getElementById('right-layout-library');
    if (topEdge && stickyBox && footerBenchMark) {
      const footerBenchMarkBoundClint = footerBenchMark.getBoundingClientRect();
      const stickyBoundClint = stickyBox.getBoundingClientRect();
      const topEdgeBoundClint = topEdge.getBoundingClientRect();
      const rightLayoutBookMarkBoundClint = rightLayoutBookMark.getBoundingClientRect();
      document.getElementById('layout-container').style.position = 'relative';
      if (window.pageYOffset >= 55) {
        document.getElementById('layout-container').style.paddingTop = '100px';
      } else if (window.pageYOffset < 55) {
        document.getElementById('layout-container').style.paddingTop = '0px';
      }
      const d = this.direction();
      if (rightLayoutBookMarkBoundClint.top > 145) {
        this.setState({ stickyState: 'absTop', styleObj: { position: 'absolute' } });
      } else if(d === 'dn' && stickyBoundClint.bottom < window.innerHeight) {
        if (this.state.stickyState !== 'fixedMid') {
          this.lastBottom = stickyBoundClint.top;
        }
        this.setState({ stickyState: 'fixBottom', styleObj: { position: 'fixed', top: this.lastBottom } });
      } else if(d === 'up' && stickyBoundClint.top >= topEdgeBoundClint.height + 15) {
        this.setState({ stickyState: 'fixTop', styleObj: { position: 'fixed', top: topEdgeBoundClint.height + 15 } });
      } else if(d === 'up' && this.state.stickyState === 'fixBottom') {
        this.setState({ stickyState: 'absMid', styleObj: { position: 'absolute', bottom: rightLayoutBookMarkBoundClint.bottom - window.innerHeight - 28 } });
      } else if(d === 'dn' && this.state.stickyState === 'fixTop') {
        this.setState({ stickyState: 'absMid', styleObj: { position: 'absolute', top: window.pageYOffset - 220 } });
      }
      if (this.state.stickyState === 'fixBottom' && footerBenchMarkBoundClint.top <= (window.innerHeight || document.documentElement.clientHeight)) {
        this.setState({ stickyState: 'absMid', styleObj: { position: 'absolute', bottom: 15 } });
      }
    }
  }
  render() {
    return (
      <div style={this.state.styleObj} className="sticky-component-v-2" id="sticky-component-ii">
        {this.props.children}
      </div>
    );
  }
}

export default StickyComponentV2;
