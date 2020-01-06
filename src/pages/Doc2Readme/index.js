import React, { Component } from 'react';
import Content from '../Home/components/content.js'
import { Form, Input, Button} from 'antd';
// import { ScanDir } from '../../util/document2readme.js'

// const electron = window.electron
class Doc2Readme extends Component {
  handleSubmit(e) {
    e.preventDefault()
    const ipcRenderer = window.electron.ipcRenderer;
    ipcRenderer.send('asynchronous-message', 'ping')
    this.props.form.validateFields((err, values) => {
      console.log('mf')
    })
    // let r = {}
    // ScanDir(r, 'E:/CSY/CCSY/基础/cs-foundation', '')
    // console.log(r)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const checkDocumentPath = {
      rules: [{
        required: true,
        message: '看这里......'
      }, {
        validator: (rule, value, cb) => {
          if (!value) {
            cb('看这里......')
          } else {
            cb()
          }
        }
      }]
    }

    return (
      <Content>
        <Form layout="inline"  onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item label="文件夹路径">
            {getFieldDecorator('documentPath', checkDocumentPath)(<Input type="text" style={{width:'500px'}} placeholder="请输入文件夹路径" />)}
          </Form.Item>
          <Form.Item>
            <Button size="default" type="primary" htmlType="submit" style={{ marginRight: '10px' }}>转换</Button>
            <Button size="default">重置</Button>
          </Form.Item>
          <div style={{border: "1px solid #ddd", transform: 'translateY(20px)', borderRadius: '6px', padding:'10px', minHeight: '500px'}}>
            {`
              例：有一文件夹'E:\\books',该文件夹目录如下:\n
              - books\n
                * 三国演义.md\n
                * 水浒传.md\n
              那么输入文件夹路径: E:\\books ,将返回\n
              ...???\n
            `}
          </div>
        </Form>
      </Content>
        
    )
  }
}

export default Form.create()(Doc2Readme)