import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import style from './main.scss';

import Page from './js/presentation/Page';
import Home from './js/presentation/Home';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Page}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('root'));
