import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './assets/styles/style.scss';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>,
  document.getElementById('root')
);
