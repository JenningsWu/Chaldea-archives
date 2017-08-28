/**
 * @flow
 */
import { combineReducers } from 'redux'

import account from './account'
import data from './data'

export default combineReducers({
  account,
  accountData: data,
})
