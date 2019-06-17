import './sass/app.sass';

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './shared/App';

window._ = require('lodash');

hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root'),
);