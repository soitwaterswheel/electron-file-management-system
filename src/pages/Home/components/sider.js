import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux'

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderPage extends Component {

  render() {
    const operation = (
      <Sider width={250} style={{ minHeight: '620px' }}>
        <Menu mode="inline" defaultSelectedKeys={['how-long-software-run']} defaultOpenKeys={['sub3']} style={menuitemStyle}>
          <SubMenu key="sub1" title={<span><Icon type="apartment" />Github</span>}>
            <Menu.Item onClick={() => { this.props.history.push('/doc2readme') }} key="doc2readme">文件目录结构转README.md</Menu.Item>
            <Menu.Item onClick={() => { this.props.history.push('/test') }} key="test">测试.md</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="apartment" />网页</span>}>
            <Menu.Item onClick={() => { this.props.history.push('./novel-query') }} key="novelQuery">小说网页爬取</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="apartment" />桌面</span>}>
            <Menu.Item key="how-long-software-run" onClick={() => { this.props.history.push('./how-long-software-run') }}>软件运行时长统计</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
    const record = (
      <Sider width={250} style={{ minHeight: '620px' }}>
        <Menu mode="inline" style={menuitemStyle}>
          <Menu.Item onClick={() => { this.props.history.push('/record/long-term') }} key="LongTerm">LongTerm</Menu.Item>
          <Menu.Item onClick={() => { this.props.history.push('/record/todolist') }} key="Todolist">Todolist</Menu.Item>
          <Menu.Item onClick={() => { this.props.history.push('/record/habit') }} key="Habit">Habit</Menu.Item>
          <Menu.Item onClick={() => { this.props.history.push('/record/diary') }} key="Diary">Diary</Menu.Item>
        </Menu>
      </Sider>
    )
    const setting = (
      <Sider width={250} style={{ minHeight: '620px' }}>
        <Menu mode="inline" defaultSelectedKeys={['nothing']} defaultOpenKeys={['sub1']} style={menuitemStyle}>
          <SubMenu key="sub1" title={<span><Icon type="apartment" />基本配置</span>}>
            <Menu.Item key="nothing" onClick={() => { this.props.history.push('/setting/document') }}>文件</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
    switch (this.props.headerKeyIndex) {
      case 0:
        return operation;
      case 1:
        return record;
      case 2:
        return setting;
      default:
        return (<></>);
    }
  }
}

let menuitemStyle = {
  fontSize: '12px',
  height: '100%',
  borderRight: 0
}

const mapState = (state) => ({
  headerKeyIndex: state.getIn(['Home', 'header', 'headerKeyIndex'])
})

const mapDispatch = () => ({

})


export default withRouter(connect(mapState, mapDispatch)(SiderPage));