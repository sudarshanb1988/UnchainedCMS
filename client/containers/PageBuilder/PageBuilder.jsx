import React from 'react';
import PropTypes from 'prop-types';

import {
  JSONComponentBuilder,
} from 'containers';

const PageBuilder = (props) => {
  const {
    pathname: slug,
  } = props.location;

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
  }

  const components = require('components');

  return <JSONComponentBuilder components={components} jsonObj={jsonObj} />;
};

PageBuilder.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default PageBuilder;
