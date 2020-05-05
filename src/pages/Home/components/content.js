import React, { Component, Children } from 'react';
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
        {this.props.children}
        {/* {
          Children.map(this.props.children, function (child) {
            return <>{child}</>
          })
        } */}
      </Content>
    )
  }
}

export default ContentPage