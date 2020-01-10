import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '../pages/Home/store/index.js';
import { reducer as doc2Readme } from '../pages/Doc2Readme/store/index.js';

const reducer = combineReducers({
  home: homeReducer,
  Doc2Readme: doc2Readme
})

export default reducer
