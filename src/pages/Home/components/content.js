import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
class ContentPage extends Component {
  render() {
    return (
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: '100%',
        }}
      >
        { this.props.children }
      </Content>
    )
  }
}

export default ContentPage