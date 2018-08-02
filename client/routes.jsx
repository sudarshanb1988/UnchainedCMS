import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import {
  PageBuilder,
  LayoutContainer,
} from 'containers';

const routesConfig = require('./routes.config.js').config;

const getRoutesComponentMapping = (history) => {
  return Object.keys(routesConfig).map((config) => {
    const item = routesConfig[config];
    return <Route exact path={item.route} history={history} component={item.component} />;
  });
};

/* eslint-disable */
const AppRoutes = ({ history }) => (
  <Switch>
    <LayoutContainer history={history}>
      <Switch>
        {getRoutesComponentMapping(history)}
        <Route path={'/*'} component={PageBuilder} />
      </Switch>
    </LayoutContainer>
  </Switch>
);

/* eslint-enable */

export default AppRoutes;
