import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Box, ContentBox, TimeStamp, Text } from './itemStyle.js';
import { Radio, Button } from 'antd';
class Item extends Component {
  render() {
    const radioStyle = { display: 'block', height: '30px', lineHeight: '30px', };
    return (
      <Box>
        <Radio.Group className='RadioGroup' onChange={() => { }} value={0}>
          <Radio style={radioStyle} value={1}>划除</Radio>
          <Radio style={radioStyle} value={2}>删除</Radio>
        </Radio.Group>
        <ContentBox>
          <TimeStamp>{this.props.time}</TimeStamp>
          <Text value={this.props.content}></Text>
        </ContentBox>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)