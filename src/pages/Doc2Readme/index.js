import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { actionCreators } from './store/index.js'

import React, { Component } from 'react';
import Content from '../Home/components/content.js'
import { Form, Input, Button, Radio, Tag, notification } from 'antd';
import { ScanDir, result2Text, createReadme } from '../../util/document2readme.js'
import Taglist from './components/Taglist.js'

class Doc2Readme extends Component {
  // 应忽略文件/文件夹
  handleChangeIgnoreType(e) {
    this.setState({ radioValue: e.target.value })
  }
  // // 新增应忽略文件/文件夹
  // handleAddIngore() {
  //   this.state.ignore[this.state.radioValue].push(this.ignoreInput.input.value)
  // }
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
  // handleSaveReadme() {
  //   let prePath = this.props.form.getFieldValue('documentPath')
  //   createReadme(this.state.readmeText, prePath).then(data => { notification.open({ message: '保存成功' }) }).catch((err) => notification.open({ message: '保存失败' }))
  // }
  render() {
    const { readmeText, radioValue, file, document, saveBtnDisabled, showReadmeText } = this.props
    const { handleSaveReadme, handleDeleteTag, handleAddIngore } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const documentPathDecorator = { initialValue: 'E:/CSY/CCSY/基础/cs-foundation', rules: [{ required: true, message: '请输入文件路径......' }] }
    const documentTitleDecorator = { initialValue: 'cs-foundation', rules: [{ required: true, message: '请输入Readme.md文件标题......' }] }

    return (
      <Content>
        <Form layout="inline">
          <Form.Item label="文件夹路径">{getFieldDecorator('documentPath', documentPathDecorator)(<Input type="text" style={{ width: '500px' }} placeholder="请输入文件夹路径" />)}</Form.Item>
          <br />
          <Form.Item label="文件标题">{getFieldDecorator('documentTitle', documentTitleDecorator)(<Input type="text" style={{ width: '400px' }} placeholder="请输入文件标题" />)}</Form.Item>
          <br />
          <Form.Item label="被忽略的文件夹/文件">
            <Taglist document={document} file={file} handleDeleteTag={handleDeleteTag}></Taglist><br />
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange={this.handleChangeIgnoreType.bind(this)} value={radioValue}>
              <Radio value={'document'}>文件夹</Radio>
              <Radio value={'file'}>文件</Radio>
            </Radio.Group>
            <Input type="text" style={{ width: '400px' }} ref={(el) => (this.ignoreInput = el)} placeholder="请输入可忽略的文件名/文件夹名" />
            <Button style={{ marginLeft: '10px' }} onClick={() => handleAddIngore(this.ignoreInput.input.value)}>添加</Button>
          </Form.Item>
          <br />
          <Form.Item style={{ 'marginTop': '10px' }}>
            <Button size="default" type="primary" style={{ marginRight: '10px' }} onClick={this.handleChange2Readme.bind(this)}>转换</Button>
            <Button size="default" type="primary" style={{ marginRight: '10px' }}
              onClick={() => { handleSaveReadme(readmeText, getFieldValue('documentPath')) }}
              disabled={saveBtnDisabled}
            >保存</Button>
            <Button size="default" onClick={() => { this.props.form.resetFields() }}>重置</Button>
          </Form.Item>
          <div dangerouslySetInnerHTML={{ __html: showReadmeText }} style={{ border: "1px solid #ddd", transform: 'translateY(20px)', borderRadius: '6px', padding: '10px', minHeight: '360px', maxHeight: '360px', overflowY: 'auto' }}>
          </div>
        </Form>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  readmeText: state.getIn(['Doc2Readme', 'formData', 'readmeText']),
  showReadmeText: state.getIn(['Doc2Readme', 'formData', 'showReadmeText']),
  document: fromJS(state.getIn(['Doc2Readme', 'formData', 'ignore', 'document'])),
  file: fromJS(state.getIn(['Doc2Readme', 'formData', 'ignore', 'file'])),
  radioValue: state.getIn(['Doc2Readme', 'formData', 'radioValue']),
  saveBtnDisabled: state.getIn(['Doc2Readme', 'formData', 'saveBtnDisabled'])
})

const mapDispatchToProps = (dispatch) => ({
  // 删除`应忽略的文件/文件夹`的tag
  handleDeleteTag(kind, index) {
    dispatch(actionCreators.handleDeleteTag(kind, index))
  },
  // 将readme文本保存为文件
  handleSaveReadme(readText, prePath) {
    dispatch(actionCreators.handleSaveReadme(readText, prePath))
  },
  // 新增应忽略文件/文件夹
  handleAddIngore(value) {
    dispatch(actionCreators.handleAddIngore(value))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Doc2Readme))