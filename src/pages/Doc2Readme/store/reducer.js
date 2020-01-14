import { fromJS } from 'immutable';
import * as constants from './constants.js';
import { Form, Input, Button, Radio, Tag, notification } from 'antd';

const defaultState = fromJS({
  formData: {
    // 实际应用于保存的readme内容
    readmeText: '',
    // 应该展示的readme内容
    showReadmeText: '',
    // 应忽略的文件名/文件夹名
    ignore: {
      folder: ['.git', 'assets'],
      file: ['README.md']
    },
  },
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.FORM_DELETE_TAG:
      return state.get('formData').get('ignore').get(action.kind).splice(action.index, 1)
    case constants.FORM_SAVE_README:
      notification.open({ message: action.msg })
      return state
    case constants.FORM_ADD_IGNORE:
      let arg = ['formData', 'ignore', action.kind]
      return state.setIn([...arg], state.getIn([...arg]).push(action.name))
    default:
      return state;
  }
}