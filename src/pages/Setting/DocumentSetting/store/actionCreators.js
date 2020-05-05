import * as constants from './constants.js';

export function setUserMessagePath(value) {
  return {
    type: constants.SET_USER_MESSAGE_PATH,
    value
  }
}