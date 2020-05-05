import * as constants from './constants.js';

export const changeSider = (headerKeyIndex) => {
  return {
    type: constants.CHANGE_SIDER_LIST,
    value: headerKeyIndex
  }
}