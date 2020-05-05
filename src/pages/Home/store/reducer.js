import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  sider: {
    list: []
  },
  header: {
    // 顶部菜单栏的可能项(不会用到)
    headerKeys: ['operation', 'record', 'setting'],
    // 当前的选中的顶部菜单栏的索引(真正用到的)
    headerKeyIndex: 0
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    // 点击顶栏的标签，更改侧边栏的列表
    case constants.CHANGE_SIDER_LIST:
      return state.setIn(['header', 'headerKeyIndex'], action.value);
    default:
      return state;
  }
}