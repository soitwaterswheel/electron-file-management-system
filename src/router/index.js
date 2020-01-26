import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout } from 'antd';
import Header from '../pages/Home/components/header.js'
import Sider from '../pages/Home/components/sider.js'
import Content from '../pages/Home/components/content.js'
import Doc2Readme from '../pages/Doc2Readme/index.js'
import Test from '../pages/Test/index.js'

const BasicRoute = () => (
  <BrowserRouter>
    <Layout>
      <Header></Header>
      <Layout>
        <Sider></Sider>
        <Route exact path="/" component={Content} />
        <Route exact path="/doc2readme" component={Doc2Readme} />
        <Route exact path="/test" component={Test} />
      </Layout>
    </Layout>
    {/* <Route exact path="/" component={Home} /> */}
  </BrowserRouter>
)

export default BasicRoute