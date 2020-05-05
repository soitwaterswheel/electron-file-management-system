import React, { Component } from 'react'
import moment from 'moment'
// 组件
import Content from '@/pages/Home/components/content.js'
import { Form, Input, Button, Radio } from 'antd';
// 方法
import { whetherRunningTargetProcess, addRecord } from '@/util/howLongSoftwareRun.js'
let currentInterval
let l = console.log

class HowLongSoftwareRun extends Component {
  state = {
    radioValue: true,
    startTime: '0',
    endTime: '0',
    duration: 0
  }
  // 开始
  startRecord() {
    this.setState({ startTime: moment().format('YYYY-MM-DD HH:mm:ss') })
    let _this = this
    currentInterval = setInterval(async function () {
      let flag = await whetherRunningTargetProcess(_this.state.radioValue, _this.props.form.getFieldValue('targetProcess'))
      if (flag === true) {
        _this.setState((prevState) => {
          return {
            duration: prevState.duration + (+_this.props.form.getFieldValue('timeInterval'))
          }
        })
      }
    }, +_this.props.form.getFieldValue('timeInterval') * 1000)
  }
  // 结束
  endRecord() {
    clearInterval(currentInterval)
    this.setState({
      endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }
  // 保存
  async saveRecord() {
    let getFieldValue = this.props.form.getFieldValue
    let dbPath = await addRecord({
      name: getFieldValue('targetProcess'),
      start_time: this.state.startTime,
      end_time: this.state.endTime,
      duration: this.state.duration,
      describe: getFieldValue('describe')
    })
    console.log(dbPath)
  }
  // 查询
  searchRecord() {

  }
  // 历史
  getHistoryRecord() {

  }

  render() {
    const { getFieldDecorator } = this.props.form
    // 样式相关
    const buttonStyle = { marginRight: '10px' }
    const inputStyle = { width: '500px' }
    // 表单验证相关
    const targetProcessDecorator = { initialValue: 'kankan', rules: [{ required: true, message: '请输入目标程序名' }] }
    const timeIntervalDecorator = { initialValue: '2', rules: [] }
    const describeDecorator = { initialValue: '', rules: [] }
    return (
      <Content>
        <Form layout="horizontal">
          <Form.Item label="目标程序">
            {getFieldDecorator('targetProcess', targetProcessDecorator)
              (<Input type="text" style={inputStyle} placeholder="请输入目标程序名(全小写)" />)}
          </Form.Item>
          <Form.Item label="监听间隔(s)">
            {getFieldDecorator('timeInterval', timeIntervalDecorator)
              (<Input type="text" style={inputStyle} placeholder="请输入监听间隔" />)}
          </Form.Item>
          <Form.Item label="是否win32平台">
            <Radio.Group onChange={(e) => { this.setState({ radioValue: e.target.value }) }} value={this.state.radioValue}>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('describe', describeDecorator)
              (<Input type="text" style={inputStyle} placeholder="请输入描述信息" />)}
          </Form.Item>

          <Form.Item label="记录">
            <div style={{ border: '1px solid #ddd', padding: '10px', 'borderRadius': '4px' }}>
              <div>开始: {this.state.startTime} 秒</div>
              <div>结束: {this.state.endTime} 秒</div>
              <div>持续: {this.state.duration} 秒</div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button style={buttonStyle} type="primary" onClick={this.startRecord.bind(this)}>开始</Button>
            <Button style={buttonStyle} type="primary" onClick={this.endRecord.bind(this)}>结束</Button>
            <Button style={buttonStyle} type="primary" onClick={this.saveRecord.bind(this)}>保存</Button>
            <Button style={buttonStyle} type="primary" onClick={this.searchRecord.bind(this)}>查找</Button>
            <Button style={buttonStyle} type="primary" onClick={this.getHistoryRecord.bind(this)}>历史</Button>
          </Form.Item>
        </Form>
      </Content>
    )
  }
}

export default (Form.create()(HowLongSoftwareRun))