import _ from 'lodash'
import { combineReducers } from 'redux'
import {
  CLICK_CONFIG,
  SWITCH_FUTURE_INSIGHT_VIEW,
  SET_SEARCHBAR_OPTION,
} from '../actions/config'

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
    case SWITCH_FUTURE_INSIGHT_VIEW:
      return {
        ...state,
        futureInsightView: action.value,
      }
    default: {
      return state
    }
  }
}

function searchbarOption(state = {}, action) {
  console.log(1, action, SET_SEARCHBAR_OPTION)
  switch (action.type) {
    case SET_SEARCHBAR_OPTION:
      console.log(action)
      return {
        ...state,
        [action.name]: action.value,
      }
    default: {
      return state
    }
  }
}

export default combineReducers({
  viewFilter,
  searchbarOption,
})
