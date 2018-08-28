import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import {
  unchainedSelector,
} from 'store/selectors';

import {
  GET_UNCHAINED_APP_DATA
} from 'store/actions';

import { getParameterByName } from 'utils';
import components from 'components';

import JSONComponentBuilder from '../JSONComponentBuilder/JSONComponentBuilder';


class PageBuilder extends Component {
  static propTypes = {
    jsonObj: PropTypes.object,
    getAppData: PropTypes.func,
    isPageDataLoading: PropTypes.bool,
    location: {
      pathname: PropTypes.string
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      jsonObj: null,
    };
  }

  componentWillReceiveProps(nextProps, props) {
    if (!isEqual(nextProps.jsonObj, props.jsonObj)) {
      this.setState({
        jsonObj: nextProps.jsonObj,
      });
    }
  }

  componentWillMount() {
    const {
      pathname: slug,
    } = this.props.location;

    let jsonObj = {};

    const previewElement = document.getElementById('unchained');

    if (previewElement) {
      jsonObj = JSON.parse(previewElement.getAttribute('data'));
    } else if (window.unchainedSite && window.unchainedSite.data.find(d => d.meta.slug === slug)) {
      jsonObj = window.unchainedSite.data.find(d => d.meta.slug === slug);
      // if (slug === '/en') {
      //   jsonObj = allPagesData['/en/'];
      // }

      if (jsonObj.length === 0) {
        jsonObj = window.unchainedSite.find(d => d.meta.slug === '/404/');
      }
    } else {
      const token = getParameterByName('token');
      const page = getParameterByName('page');
      this.props.getAppData(page, token);
    }
    this.setState({ jsonObj });
  }

  render() {
    const { isPageDataLoading } = this.props;
    const { jsonObj } = this.state;

    return <JSONComponentBuilder isPageDataLoading={isPageDataLoading} components={components} jsonObj={jsonObj} />;
  }
}


const mapStateToProps = (state) => ({
  jsonObj: unchainedSelector.getUnchainedAppData(state),
  isPageDataLoading: unchainedSelector.isPageDataLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAppData: (page, token) => {
    dispatch(GET_UNCHAINED_APP_DATA(page, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBuilder);
