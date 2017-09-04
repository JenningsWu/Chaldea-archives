import _ from 'lodash'
import { CLICK_CONFIG, SWITCH_FUTURE_INSIGHT_VIEW } from '../actions/config'

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

export default function config(state = {}, action) {
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
