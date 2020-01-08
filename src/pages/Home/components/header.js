import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
const { Header} = Layout;

class HeaderPage extends Component {

  render() {
    return (
      <Header className="header" style={{height: '60px'}}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">操作</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default HeaderPage;