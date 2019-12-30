import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home/index.js';

const BasicRoute = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
  </BrowserRouter>
)

export default BasicRoute