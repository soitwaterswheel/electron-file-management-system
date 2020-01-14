import React, { useState, useEffect, Component } from 'react'

import Content from '@/pages/Home/components/content.js'
import { Form, Input, List, Button } from 'antd';

class NovelQuery extends Component {

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    // 样式相关
    const inputStyle = { width: '300px' }
    // list 相关
    const listLoadMore = (<div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}><Button onClick={this.onLoadMore}>loading more</Button></div>)
    const listRenderItem = (item) => (<List.Item>
      <span>{item}</span>
      <Input type="text" style={{ width: '300px' }} placeholder="请输入目标DOM(将被提取文本)选择器" title="即当前页面下你所感兴趣的文本所在DOM元素的className或id" />
      <Input type="text" style={{ width: '300px' }} placeholder="请输入目标DOM(含跳转链接)选择器" title="即当前页面下含跳转至下一页面链接的DOM元素的className或id" />
    </List.Item>)
    const listDataSource = ['1', '2']
    // 表单验证相关
    const targetWebsiteDecorator = { initialValue: 'https://', rules: [{ required: true, message: '请输入目标网站地址......' }] }
    const repeatTimesDecorator = { initialValue: '1', rules: [{}] }
    const savePathDecorator = { initialValue: '', rules: [{ required: true, message: '请输入文件保存路径......' }] }

    return (
      <Content>
        <Form layout="horizontal">
          <Form.Item label="目标网站">
            {getFieldDecorator('targetWebsite', targetWebsiteDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入目标网站地址" />)}
          </Form.Item>
          <Form.Item label="单次流程">
            <List itemLayout="horizontal" bordered loadMore={listLoadMore} dataSource={listDataSource} renderItem={listRenderItem}>
            </List>
          </Form.Item>
          <Form.Item label="流程执行次数">
            {getFieldDecorator('repeatTimes', repeatTimesDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入流程重复次数" />)}
          </Form.Item>
          <Form.Item label="文本保存路径">
            {getFieldDecorator('savePath', savePathDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入文件保存路径" />)}
          </Form.Item>
        </Form>
      </Content>
    )
  }
}

export default (Form.create()(NovelQuery))