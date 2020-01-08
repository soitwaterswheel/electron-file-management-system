import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    return (<div></div>)
  }
}

const mapState = (state) => ({
  siderList: state.getIn(['home', 'sider', 'list'])
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(Home);
