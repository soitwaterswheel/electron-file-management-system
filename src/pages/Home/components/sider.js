import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux'

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderPage extends Component {
  // handleMenuitem(link) {
  //   this.props.history.push(link)
  // }

  render () {
    return (
      <Sider width={250} style={{minHeight: '620px'}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={<span><Icon type="apartment" />Github</span>}
          >
            <Menu.Item style={menuitemStyle} onClick={() => { this.props.history.push('/doc2readme') }} key="1">文件目录结构转README.md</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="apartment" />subnav 2</span>}
          >
            <Menu.Item key="5">option5</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={<span><Icon type="apartment" />subnav 3</span>}
          >
            <Menu.Item key="9">option9</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

let menuitemStyle = {
  fontSize: '12px'
}

const mapState = () => ({
  
})

const mapDispatch = () => ({
  
})


export default withRouter(connect(mapState, mapDispatch)(SiderPage));