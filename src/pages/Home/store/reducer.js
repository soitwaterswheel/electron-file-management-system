import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  sider: {
    list: []
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_SIDER_LIST:
      return state.set('showScroll', action.show);
    default:
      return state;
  }
}