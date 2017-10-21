import _ from 'lodash'
import { combineReducers } from 'redux'
import {
  CLICK_CONFIG,
  SET_VIEW_FILTER,
  SET_SEARCHBAR_OPTION,
  SET_GLOBAL_CONFIG,
} from '../actions/config'
import { SWITCH_ACCOUNT_EDITING_MODE } from '../actions/account'

function getConfig(state = {}, action) {
  // if (action.type === REHYDRATE) {
  //   const {in}
  // }
  switch (action.type) {
    case CLICK_CONFIG: {
      const { name, key, value } = action
      const subState = state[name] || {}
      return {
        ...state,
        [name]: {
          ...subState,
          [key]: value,
        },
      }
    }

    default: {
      return state
    }
  }
}

function viewFilter(state = {}, action) {
  switch (action.type) {
    case CLICK_CONFIG:
      return {
        ...state,
        [action.parentName]: getConfig(state[action.parentName], action),
      }
    case SET_VIEW_FILTER:
      return {
        ...state,
        [action.name]: action.value,
      }
    default: {
      return state
    }
  }
}

function searchbarOption(state = {}, action) {
  switch (action.type) {
    case SET_SEARCHBAR_OPTION:
      return {
        ...state,
        [action.name]: action.value,
      }
    default: {
      return state
    }
  }
}

function account(state = {}, action) {
  switch (action.type) {
    case SWITCH_ACCOUNT_EDITING_MODE:
      return {
        ...state,
        editing: action.value,
      }
    default: {
      return state
    }
  }
}

function global(state = {}, action) {
  switch (action.type) {
    case SET_GLOBAL_CONFIG:
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      return state
  }
}

export default combineReducers({
  viewFilter,
  searchbarOption,
  account,
  global,
})
