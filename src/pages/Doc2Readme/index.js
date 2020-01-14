import { connect } from 'react-redux'
import { actionCreators } from './store/index.js'
import React, { Component } from 'react';

import Content from '../Home/components/content.js'
import { Form, Input, Button, Radio } from 'antd';
import { ScanDir, result2Text, createReadme } from '../../util/document2readme.js'
import Taglist from './components/Taglist.js'

class Doc2Readme extends Component {
  state = {
    // 当前选择的类型：0表示document|1表示file
    radioValue: 'folder',
    // 保存按钮是否可用
    saveBtnDisabled: true,
    // 应忽略的文件名/文件夹名
    ignore: {
      folder: ['.git', 'assets'],
      file: ['README.md']
    },
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
  // handleSaveReadme() {
  //   let prePath = this.props.form.getFieldValue('documentPath')
  //   createReadme(this.state.readmeText, prePath).then(data => { notification.open({ message: '保存成功' }) }).catch((err) => notification.open({ message: '保存失败' }))
  // }

  render() {
    const { readmeText, saveBtnDisabled, showReadmeText, folder, file } = this.props
    const { handleSaveReadme, handleDeleteTag, handleAddIngore } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const documentPathDecorator = { initialValue: 'E:/CSY/CCSY/基础/cs-foundation', rules: [{ required: true, message: '请输入文件路径......' }] }
    const documentTitleDecorator = { initialValue: 'cs-foundation', rules: [{ required: true, message: '请输入Readme.md文件标题......' }] }


    return (
      <Content>
        <Form layout="inline">
          <Form.Item label="文件夹路径">{getFieldDecorator('documentPath', documentPathDecorator)
            (<Input type="text" style={{ width: '500px' }} placeholder="请输入文件夹路径" />)}</Form.Item>
          <br />
          <Form.Item label="文件标题">{getFieldDecorator('documentTitle', documentTitleDecorator)
            (<Input type="text" style={{ width: '400px' }} placeholder="请输入文件标题" />)}</Form.Item>
          <br />
          <Form.Item label="被忽略的文件夹/文件"></Form.Item>
          <br />
          <Taglist list={folder} kind='folder' handleDeleteTag={handleDeleteTag}></Taglist>
          <Taglist list={file} kind='file' handleDeleteTag={handleDeleteTag}></Taglist>
          <Form.Item>
            <Radio.Group onChange={(e) => { this.setState({ radioValue: e.target.value }) }} value={this.state.radioValue}>
              <Radio value={'folder'}>文件夹</Radio>
              <Radio value={'file'}>文件</Radio>
            </Radio.Group>
            <Input type="text" style={{ width: '400px' }} ref={(el) => (this.ignoreInput = el)} placeholder="请输入可忽略的文件名/文件夹名" />
            <Button style={{ marginLeft: '10px' }} onClick={() => {
              let [radioValue, value] = [this.state.radioValue, this.ignoreInput.input.value]
              this.setState({
                ignore: {
                  [radioValue]: [...this.state.ignore[radioValue], value]
                }
              })
              handleAddIngore(radioValue, value)
            }}>添加</Button>
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

const mapStateToProps = (state) => {
  return {
    readmeText: state.getIn(['Doc2Readme', 'formData', 'readmeText']),
    showReadmeText: state.getIn(['Doc2Readme', 'formData', 'showReadmeText']),
    saveBtnDisabled: state.getIn(['Doc2Readme', 'formData', 'saveBtnDisabled']),
    folder: state.getIn(['Doc2Readme', 'formData', 'ignore', 'folder']),
    // folder: state.toJS().Doc2Readme.formData.ignore.folder,
    file: state.getIn(['Doc2Readme', 'formData', 'ignore', 'file']),
  }
}

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
  handleAddIngore(kind, name) {
    dispatch(actionCreators.handleAddIngore(kind, name))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Doc2Readme))