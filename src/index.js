import React from 'react';
import ReactDOM from 'react-dom';
import BasicRoute from './router/index.js';
import { Provider } from 'react-redux'
import store from './store/index.js'
import './statics/reset.css'

ReactDOM.render(
  <Provider store={store}>
    <BasicRoute />
  </Provider>,
  document.getElementById('root')
);

