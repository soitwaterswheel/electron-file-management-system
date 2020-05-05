import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store/index.js';
import Content from '@/pages/Home/components/content.js';
import { Form, Input, Button } from 'antd'

class DocumentSetting extends Component {
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { UserMessagePath } = this.props;
    const { handleSetUserMessagePath } = this.props;
    const UserMessagePathDecorator = { initialValue: UserMessagePath, rules: [{ required: true, message: '请输入存放资料的文件夹路径......' }] }

    return (
      <Content>
        <Form layout="inline">
          <Form.Item label="用户信息存放路径">
            {
              getFieldDecorator('UserMessagePath', UserMessagePathDecorator)
                (<Input type='text' placeholder='请输入存放资料的文件夹路径' style={{ width: '500px' }} />)
            }
          </Form.Item>
          <Button size="default" type="primary" style={{ marginRight: '10px' }} onClick={() => { handleSetUserMessagePath(getFieldValue('UserMessagePath')) }}>确定</Button>
        </Form>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  UserMessagePath: state.getIn(['Setting', 'DocumentSetting', 'UserMessagePath'])
})
const mapDispatchToProps = (dispatch) => ({
  handleSetUserMessagePath(path) {
    dispatch(actionCreators.setUserMessagePath(path))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(DocumentSetting))