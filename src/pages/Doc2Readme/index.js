import React, { Component } from 'react';
import Content from '../Home/components/content.js'
import { Form, Input, Button, Radio, Tag, notification } from 'antd';
import { ScanDir, result2Text, createReadme } from '../../util/document2readme.js'
class Doc2Readme extends Component {
  state = {
    readmeText: '(...转换后的README.MD文本)',
    showReadmeText: '',
    ignore: {
      document: ['.git', 'assets'],
      file: ['README.md']
    },

    radioValue: 'document',
    saveBtnDisabled: true,
  }
  // 应忽略文件/文件夹
  handleChangeIgnoreType(e) {
    this.setState({ radioValue: e.target.value })
  }
  // 新增应忽略文件/文件夹
  handleAddIngore() {
    this.state.ignore[this.state.radioValue].push(this.ignoreInput.input.value)
  }
  // 提交并转换为readme.md
  handleChange2Readme(e) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let documentPath = this.props.form.getFieldValue('documentPath')
        let result = {}
        ScanDir(result, documentPath, '', this.state.ignore, documentPath)
        this.setState((prevState, props) => {
          return {
            readmeText: result2Text(result, props.form.getFieldValue('documentTitle')),
          }
        },
          () => {
            this.setState({
              showReadmeText: this.state.readmeText.split('\n').map((item) => (`${item}<br/>`)).join(''),
              saveBtnDisabled: false
            })
          }
        )
      }
    })
  }
  // 将readme文本保存为文件
  handleSaveReadme() {
    let prePath = this.props.form.getFieldValue('documentPath')
    createReadme(this.state.readmeText, prePath).then(data => { notification.open({ message: '保存成功' }) }).catch((err) => notification.open({ message: '保存失败' }))
  }
  // 删除`应忽略的文件/文件夹`的tag
  handleDeleteTag(type, item, index) {
    this.state.ignore[type].splice(index, 1)
  }
  handleResetForm() {
    this.props.form.resetFields()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const documentPathDecorator = { initialValue: 'E:/CSY/CCSY/基础/cs-foundation', rules: [{ required: true, message: '请输入文件路径......' }] }
    const documentTitleDecorator = { initialValue: '标题', rules: [{ required: true, message: '请输入Readme.md文件标题......' }] }
    const ignoreDecorator = { initialValue: '' }

    return (
      <Content>
        <Form layout="inline">
          <Form.Item label="文件夹路径">{getFieldDecorator('documentPath', documentPathDecorator)(<Input type="text" style={{ width: '500px' }} placeholder="请输入文件夹路径" />)}</Form.Item>
          <Form.Item label="文件标题">
            {getFieldDecorator('documentTitle', documentTitleDecorator)(<Input type="text" style={{ width: '400px' }} placeholder="请输入文件标题" />)}
          </Form.Item>
          <Form.Item label="应忽略文件夹/文件">
            <Radio.Group onChange={this.handleChangeIgnoreType.bind(this)} value={this.state.radioValue}>
              <Radio value={'document'}>文件夹</Radio>
              <Radio value={'file'}>文件</Radio>
            </Radio.Group>
            <Input type="text" style={{ width: '400px' }} ref={(el) => (this.ignoreInput = el)} placeholder="请输入文件标题" />
            {/* {getFieldDecorator('ignore', ignoreDecorator)(<Button style={{ marginLeft: '10px' }} onClick={this.handleAddIngore.bind(this)}>添加</Button>)} */}
            <Button style={{ marginLeft: '10px' }} onClick={this.handleAddIngore.bind(this)}>添加</Button>
          </Form.Item>
          <br />
          <Form.Item>
            {
              this.state.ignore.document.map((item, index) => {
                return (
                  <Tag color="orange" type="document" key={index} closable={index !== 0} onClose={this.handleDeleteTag.bind(this, 'document', item, index)}>{item}</Tag>
                )
              })
            }
            {
              this.state.ignore.file.map((item, index) => {
                return (
                  <Tag color="blue" type="file" key={index} closable={index !== 0} onClose={this.handleDeleteTag.bind(this, 'file', item, index)}>{item}</Tag>
                )
              })
            }
          </Form.Item>
          <br />
          <Form.Item style={{ 'marginTop': '10px' }}>
            <Button size="default" type="primary" style={{ marginRight: '10px' }} onClick={this.handleChange2Readme.bind(this)}>转换</Button>
            <Button size="default" type="primary" style={{ marginRight: '10px' }} onClick={this.handleSaveReadme.bind(this)} disabled={this.state.saveBtnDisabled}>保存</Button>
            <Button size="default" onClick={this.handleResetForm.bind(this)}>重置</Button>
          </Form.Item>
          <div dangerouslySetInnerHTML={{ __html: this.state.showReadmeText }} style={{ border: "1px solid #ddd", transform: 'translateY(20px)', borderRadius: '6px', padding: '10px', minHeight: '360px', maxHeight: '360px', overflowY: 'auto' }}>
          </div>
        </Form>
      </Content>

    )
  }
}

export default Form.create()(Doc2Readme)