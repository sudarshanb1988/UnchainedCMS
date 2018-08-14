import merge from 'lodash/merge';

const browser = typeof window !== 'undefined';

const config = {
  // defaults
  all: {
    env: process.env.HOST_ENV || 'local',
    publicPath: '/',
    apiUrl: '/',
    elasticSearchUrl: '/es-search',
    versionString: 'v0.0.1',
    apiVersion: 'api/v1',
    browser,
    analystURLPrefix: '/our-department/analysts'
  },
  // local overides, if any
  local: {
    apiUrl: 'http://192.168.3.125:9000',
    mockApiUrl: 'https://bmo-economics-qa-mockapi.galepartners.com/mock-api',
    elasticSearchUrl: 'https://bmo-economics-osqa-ui.galepartners.com/search',
    subDomain: window.location.hostname
  },
  dev: {
    apiUrl: '/api/v1',
    mockApiUrl: '/mock-api',
    elasticSearchUrl: '/search',
  },
  qa: {
    apiUrl: '/api/v1',
    mockApiUrl: '/mock-api',
    elasticSearchUrl: '/search',
  },
  uat: {
    apiUrl: '/api/v1',
    mockApiUrl: '/mock-api',
    elasticSearchUrl: '/search',
  },
  prod: {
    apiUrl: '/api/v1',
    mockApiUrl: '/mock-api',
    elasticSearchUrl: '/search',
  }
};

module.exports = merge(config.all, config[config.all.env]);

export default module.exports;
