import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { env } from 'config';
import { DumbledoreLintContainer } from 'containers';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from 'store/configure';
import AppRoutes from 'routes';
import { createBrowserHistory } from 'history';

require('./styles/app.scss');

const root = document.getElementById('app');
const history = createBrowserHistory();
const store = configureStore({}, history);
const isDev = env === 'local';


const renderApp = () => {
  if (isDev) {
    const lintResult = require('../dumbledore-lint.json');
    const hasLintErrors = lintResult && Object.keys(lintResult.messages).length > 0;
    if (hasLintErrors) return <DumbledoreLintContainer errors={Object.values(lintResult.messages)} />;
  }
  return (
    <AppContainer>
      <Provider store={store} key={Math.random()}>
        <ConnectedRouter history={history} key={Math.random()}>
          <AppRoutes history={history} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );
};

render(renderApp(), root);

if (module.hot) {
  module.hot.accept();
}

// error logger

require('./errorLogger');
