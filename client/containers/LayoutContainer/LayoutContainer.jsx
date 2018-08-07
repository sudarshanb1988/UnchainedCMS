import React, { Component } from 'react';

import { Container } from 'unchained-ui-react';
import { pushToPageDataLayer } from 'analytics';
import pageGTMVariables from 'analytics/page';
import { getParameterByName } from 'utils';

class LayoutContainer extends Component {
  props: {
    children: {},
    location: '',
    history: {}
  };

  constructor(props) {
    super(props);
    const { history } = props;
    history.listen((location) => {
      window.pageGlobalParams = null;
      this.handleGTMOnHistoryChange(location);
    });
  }

  handleGTMOnHistoryChange = (location = window.location) => {
    const { pathname } = location;
    if (pageGTMVariables[pathname]) {
      pushToPageDataLayer(pageGTMVariables[pathname]);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      if (getParameterByName('noscroll') !== 'true' && !location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }

  componentDidMount() {
    this.handleGTMOnHistoryChange();
    window.scrollTo(0, 0);
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <Container id={'layout-container'} fluid>
          {children}
        </Container>
      </div>
    );
  }
}

export default LayoutContainer;
