import {
  SET_EVENT,
  SET_EVENT_POOL,
  FINISH_EVENT,
  SET_CONDITIONAL_VALUE,
  SET_MATERIAL_NUM,
} from '../actions/event'
import {
  IMPORT_DATA,
} from '../actions/account'


function eventItem(
  state = {
    active: false,
    pool: [],
    finish: false,
    conditional: 1,
    material: {},
  }, action,
) {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        active: action.value,
      }
    case SET_EVENT_POOL: {
      const { pool } = state
      const { poolIndex, value } = action
      while (pool.length <= poolIndex) {
        pool.push(0)
      }
      return {
        ...state,
        pool: [
          ...pool.slice(0, poolIndex),
          value,
          ...pool.slice(poolIndex + 1),
        ],
      }
    }
    case FINISH_EVENT:
      return {
        ...state,
        finish: true,
      }
    case SET_CONDITIONAL_VALUE:
      return {
        ...state,
        conditional: action.value,
      }
    case SET_MATERIAL_NUM: {
      const { material } = state
      const { materialId, value } = action
      return {
        ...state,
        material: {
          ...material,
          [materialId]: value,
        },
      }
    }
    default:
      return state
  }
}

function event(state = {}, action) {
  switch (action.type) {
    case SET_EVENT:
    case SET_EVENT_POOL:
    case FINISH_EVENT:
    case SET_CONDITIONAL_VALUE:
    case SET_MATERIAL_NUM:
      return {
        ...state,
        [action.id]: eventItem(state[action.id], action),
      }
    case IMPORT_DATA:
      return {
        ...state,
        ...action.data.event,
      }
    default:
      return state
  }
}

export default event
