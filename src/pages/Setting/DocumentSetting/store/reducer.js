import { fromJS } from 'immutable';
import * as constants from './constants.js';

const defaultState = fromJS({
  DocumentSetting: {
    // 用户存放个人资料的地址（全局）
    UserMessagePath: 'E:/CSY/workspace',
    // 长期目标的文件名
    LongTermFileName: 'longTerm.json'
  }
})

export default function (state = defaultState, action) {
  switch (action.type) {
    case constants.SET_USER_MESSAGE_PATH:
      console.log(state.getIn(['DocumentSetting', 'UserMessagePath']))
      return state.setIn(['DocumentSetting', 'UserMessagePath'], action.value);
    default:
      return state;
  }
} 