import React, { Component } from 'react';
import Item from '../components/item.js';
import { connect } from 'react-redux';
import Content from '@/pages/Home/components/content.js'
import { Radio, Input, Button } from 'antd';

class LongTerm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [{}],
      inputValue: ''
    }
  }
  componentDidMount() {
    let fs = window.fs
    let txt = fs.readFileSync(this.props.LongTermPathName, 'utf-8')
    window._ss = this
    this.setState(() => {
      return {
        list: JSON.parse(txt)
      }
    })
  }
  reloadCurrentComponent() {
    this.props.history.push('/record/long-term')
  }
  handleChangeInputValue(e) {
    e.persist();
    this.setState(() => ({
      inputValue: e.target.value
    }))
  }
  // 新增一条信息,并写入文件
  addMessage() {
    this.setState((preState) => ({
      list: [...preState.list, {
        "time": new Date().toLocaleString(),
        "content": this.state.inputValue
      }]
    }), () => {
      this.writeList2File()
    })
  }
  // 将所有条目写入文件
  writeList2File() {
    window.fs.writeFileSync(this.props.LongTermPathName, JSON.stringify(this.state.list), 'utf8')
  }
  con(_this) {
    console.log('———————————>>>\n', _this)
    console.log(typeof _this)
    return 10
  }
  render() {
    return (
      <Content>
        {
          typeof (this.state.list) == 'object' &&
          (this.state.list).map((value, index, arr) => {
            return (<Item time={value.time} content={value.content} key={index}></Item>)
          })
        }
        <div style={{ marginTop: '10px' }}>
          <Input type="textarea" placeholder='请输入......' value={this.state.inputValue} onChange={this.handleChangeInputValue.bind(this)} />
        </div>
        <div style={{ marginTop: '10px', float: 'right' }} >
          <Button size='default' style={{ marginRight: '10px' }} type='primary' onClick={this.addMessage.bind(this)}>新增</Button>
          <Button size='default' style={{ marginRight: '10px' }} type='primary' onClick={this.writeList2File.bind(this)}>保存</Button>
          <Button size='default' style={{ marginRight: '10px' }} type='primary' onClick={this.reloadCurrentComponent.bind(this)}>重载</Button>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userMessagePath: state.getIn(['Setting', 'DocumentSetting', 'UserMessagePath']),
    LongTermFileName: state.getIn(['Setting', 'DocumentSetting', 'LongTermFileName']),
    LongTermPathName: path.resolve(state.getIn(['Setting', 'DocumentSetting', 'UserMessagePath']), state.getIn(['Setting', 'DocumentSetting', 'LongTermFileName']))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange() { }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LongTerm);
