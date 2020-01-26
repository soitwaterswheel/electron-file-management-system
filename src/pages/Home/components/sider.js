import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux'

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderPage extends Component {

  render() {
    return (
      <Sider width={250} style={{ minHeight: '620px' }}>
        <Menu mode="inline" defaultSelectedKeys={['doc2readme']} defaultOpenKeys={['sub3']} style={menuitemStyle}>
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
  }
}

let menuitemStyle = {
  fontSize: '12px',
  height: '100%',
  borderRight: 0
}

const mapState = () => ({

})

const mapDispatch = () => ({

})


export default withRouter(connect(mapState, mapDispatch)(SiderPage));