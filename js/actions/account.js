const ADD_ACCOUNT = 'add_account'
const SET_ACCOUNT_NAME = 'set_account_name'
const SWITCH_ACCOUNT = 'switch_account'
const SWITCH_ACCOUNT_EDITING_MODE = 'switch_account_editing_mode'
const DELETE_ACCOUNT = 'delete_account'
const IMPORT_DATA = 'import_data'

function addAccount(name = '') {
  return {
    type: ADD_ACCOUNT,
    name,
  }
}

function setAccountName(id, name) {
  return {
    type: SET_ACCOUNT_NAME,
    id,
    name,
  }
}

function switchAccount(to) {
  return {
    type: SWITCH_ACCOUNT,
    to,
  }
}

function switchAccountEditingMode(value) {
  return {
    type: SWITCH_ACCOUNT_EDITING_MODE,
    value,
  }
}

function deleteAccount(id) {
  return {
    type: DELETE_ACCOUNT,
    id,
  }
}

function importData(data) {
  return {
    type: IMPORT_DATA,
    data,
  }
}

export {
  ADD_ACCOUNT,
  addAccount,
  SET_ACCOUNT_NAME,
  setAccountName,
  SWITCH_ACCOUNT,
  switchAccount,
  SWITCH_ACCOUNT_EDITING_MODE,
  switchAccountEditingMode,
  DELETE_ACCOUNT,
  deleteAccount,
  IMPORT_DATA,
  importData,
}
