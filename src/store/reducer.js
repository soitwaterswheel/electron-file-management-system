import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '@/pages/Home/store/index.js';
import { reducer as doc2Readme } from '@/pages/Operation/Doc2Readme/store/index.js';
import { reducer as setting } from '@/pages/Setting/DocumentSetting/store/index.js';

const reducer = combineReducers({
  Home: homeReducer,
  Doc2Readme: doc2Readme,
  Setting: setting
})

export default reducer
