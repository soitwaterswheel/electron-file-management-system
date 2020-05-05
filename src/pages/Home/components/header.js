import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "../store/index.js";
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class HeaderPage extends Component {

  render() {
    let { handleChangeSider } = this.props
    return (
      <Header className="header" style={{ height: '60px' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={() => handleChangeSider(0)}>操作</Menu.Item>
          <Menu.Item key="2" onClick={() => handleChangeSider(1)}>记录</Menu.Item>
          <Menu.Item key="3" onClick={() => handleChangeSider(2)}>配置</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // headerKeys: state.getIn(['Home', 'header', 'headerKeys'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSider(headerKey) {
      dispatch(actionCreators.changeSider(headerKey))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);