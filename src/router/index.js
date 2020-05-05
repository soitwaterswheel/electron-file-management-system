import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout } from 'antd';
import Header from '../pages/Home/components/header.js'
import Sider from '../pages/Home/components/sider.js'
import Content from '../pages/Home/components/content.js'

import Doc2Readme from '../pages/Operation/Doc2Readme/index.js'
import Test from '../pages/Operation/Test/index.js'
import NovelQuery from '../pages/Operation/NovelQuery/index.js'
import HowLongSoftwareRun from '../pages/Operation/HowLongSoftwareRun/index.js'

import Todolist from '@/pages/Record/Todolist/index.js';
import Diary from '@/pages/Record/Diary/index.js';
import LongTerm from '@/pages/Record/LongTerm/index.js';
import Habit from '@/pages/Record/Habit/index.js';

import DocumentSetting from '../pages/Setting/DocumentSetting/index.js'

const BasicRoute = () => (
  <BrowserRouter>
    <Layout>
      <Header></Header>
      <Layout>
        <Sider></Sider>
        <Route exact path="/" component={Content} />
        <Route exact path="/doc2readme" component={Doc2Readme} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/novel-query" component={NovelQuery} />
        <Route exact path="/how-long-software-run" component={HowLongSoftwareRun} />

        <Route exact path="/setting/document" component={DocumentSetting} />

        <Route exact path="/record/long-term" component={LongTerm} />
        <Route exact path="/record/todolist" component={LongTerm} />
        <Route exact path="/record/diary" component={LongTerm} />
        <Route exact path="/record/habit" component={Habit} />
      </Layout>
    </Layout>
  </BrowserRouter>
)

export default BasicRoute