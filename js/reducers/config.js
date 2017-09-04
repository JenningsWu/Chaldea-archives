import _ from 'lodash'
import { CLICK_CONFIG } from '../actions/config'

function getConfig(state = {}, action) {
  // if (action.type === REHYDRATE) {
  //   const {in}
  // }
  switch (action.type) {
    case CLICK_CONFIG: {
      const { name, key } = action
      const subState = state[name] || {}
      return {
        ...state,
        [name]: {
          ...subState,
          [key]: !subState[key],
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
    default: {
      return state
    }
  }
}
