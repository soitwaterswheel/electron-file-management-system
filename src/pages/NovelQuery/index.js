import React, { Component } from 'react'
// 组件
import Content from '@/pages/Home/components/content.js'
import { Form, Input, Button } from 'antd';
// 方法
import { getLinks, getDemoPage, catchWebsite } from '@/util/novelQuery.js'

class NovelQuery extends Component {
  state = {
    listDataSource: [[1, 'Selector', 0]],
    showReadmeText: '',
    links: []
  }
  // 获取章节链接
  async getLinks() {
    let opts = {
      path: this.props.form.getFieldValue('targetWebsite'),
      selector: this.props.form.getFieldValue('targetLinks'),
      prefix: this.props.form.getFieldValue('linkPrefix')
    }
    let links = await getLinks(opts)
    let str = (
      <>
        <p>链接数量:{links.length}</p>
        {
          links.map((item, index) => {
            let desc = 'NO.' + item.index + ' ; ' + item.name + ';  '
            return (<p key={index}>{desc + item.path}</p>)
          })
        }
      </>
    )
    this.setState({
      showReadmeText: str,
      links
    })
  }
  // 查看文本示例
  async getContentDemo() {
    try {
      let opts = {
        path: this.state.links[0].path
      }
      let page = await getDemoPage(opts)
      this.setState({
        showReadmeText: page
      })
    } catch (err) {
      console.log('error in getContentDemo:\n', err)
    }
  }
  // 保存
  async saveText() {
    let [start, end] = [this.areaInput1.state.value, this.areaInput2.state.value]
    for (let i = start; i <= end; i++) {
      let opts = {
        path: this.state.links[i].path,
        index: this.state.links[i].index,
        selector: this.props.form.getFieldValue('contentSelector'),
        savePath: this.props.form.getFieldValue('savePath')
      }
      await catchWebsite(opts)
    }
    return true
  }
  render() {
    const { getFieldDecorator } = this.props.form
    // 样式相关
    const buttonStyle = { marginRight: '10px' }
    // 表单验证相关
    const targetWebsiteDecorator = { initialValue: 'https://www.huaxiangju.com/82379/', rules: [{ required: true, message: '请输入目标网站地址......' }] }
    const linkPrefixDecorator = { initialValue: 'https://www.huaxiangju.com', rules: [] }
    const targetLinksDecorator = { initialValue: '.chapterCon ul li a', rules: [] }
    const contentDecorator = { initialValue: '.articleCon p', }
    const savePathDecorator = { initialValue: 'E:/CSY/workspace/electron-file-management-system/src/test/12', rules: [{ required: true, message: '请输入文件保存路径......' }] }

    return (
      <Content>
        <Form layout="horizontal">
          <Form.Item label="小说目录页">
            {getFieldDecorator('targetWebsite', targetWebsiteDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入小说目录页地址" />)}
          </Form.Item>
          <Form.Item label="链接前缀">
            {getFieldDecorator('linkPrefix', linkPrefixDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入跳转链接前缀" />)}
          </Form.Item>
          <Form.Item label="目录元素选择器">
            {getFieldDecorator('targetLinks', targetLinksDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入目录元素选择器" />)}
          </Form.Item>
          <Form.Item label="小说内容页内容元素选择器">
            {getFieldDecorator('contentSelector', contentDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入内容元素选择器" />)}
          </Form.Item>
          <Form.Item label="爬取范围">
            <Input type="text" ref={el => this.areaInput1 = el} style={{ width: '200px', marginRight: '10px' }} placeholder="请输入起始章节"></Input>
            ~
            <Input type="text" ref={el => this.areaInput2 = el} style={{ width: '200px', marginLeft: '10px' }} placeholder="请输入终止章节"></Input>
          </Form.Item>
          <Form.Item label="文本保存路径">
            {getFieldDecorator('savePath', savePathDecorator)
              (<Input type="text" style={{ width: '500px' }} placeholder="请输入文件保存路径" />)}
          </Form.Item>
          <Form.Item>
            <Button style={buttonStyle} type="primary" onClick={this.getLinks.bind(this)}>获取章节链接</Button>
            <Button style={buttonStyle} type="primary" onClick={this.getContentDemo.bind(this)}>查看文本示例</Button>
            <Button style={buttonStyle} type="primary" onClick={this.saveText.bind(this)}>保存</Button>
          </Form.Item>
        </Form>
        <div style={{ border: "1px solid #ddd", transform: 'translateY(20px)', borderRadius: '6px', padding: '10px', minHeight: '360px', maxHeight: '360px', overflowY: 'auto' }}>
          {this.state.showReadmeText}
        </div>
      </Content>
    )
  }
}

export default (Form.create()(NovelQuery))