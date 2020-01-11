import * as constants from './constants.js';
import { ScanDir, result2Text, createReadme } from '../../../util/document2readme.js'

export const handleDeleteTag = (kind, index) => ({
  type: constants.FORM_DELETE_TAG,
  kind,
  index
})

export const handleSaveReadme = (readmeText, prePath) => {
  return (dispatch) => {
    let saveReadmeCallback = { type: constants.FORM_SAVE_README, msg: '保存成功' }
    createReadme(readmeText, prePath)
      .then(() => dispatch(saveReadmeCallback))
      .catch((err) => {
        saveReadmeCallback.msg = "保存失败"
        dispatch(saveReadmeCallback)
      })
  }
}

export const handleAddIngore = (kind, name) => ({
  type: constants.FORM_ADD_IGNORE,
  kind, name
})
