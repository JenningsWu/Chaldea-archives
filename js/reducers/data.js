import _ from 'lodash'
import { combineReducers } from 'redux'
import { SET_MATERIAL_NUM } from '../actions/material'
import { SET_SERVANT_INFO, REMOVE_SERVANT, FINISH_SERVANT, SELECT_SERVANT } from '../actions/servant'
import { SET_EVENT, SET_EVENT_POOL, FINISH_EVENT } from '../actions/event'
import {
  ADD_ACCOUNT,
  SET_ACCOUNT_NAME,
  DELETE_ACCOUNT,
  IMPORT_DATA,
} from '../actions/account'
import materialList from '../assets/data/materialList'
import config from './config'
import { getEventMaterial } from '../schema/Event'


const initialMaterialData = _.mapValues(materialList, () => ({
  current: 0,
}))

function name(state = '', action) {
  switch (action.type) {
    case SET_ACCOUNT_NAME:
      return action.name
    default:
      return state
  }
}

function material(state = initialMaterialData, action) {
  switch (action.type) {
    case SET_MATERIAL_NUM:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          current: action.num,
        },
      }
    case IMPORT_DATA:
      return {
        ...state,
        ...action.data.material,
      }
    case FINISH_EVENT: {
      const { id, pool } = action
      const ret = getEventMaterial(id, pool)
      return {
        ..._.assignWith(state, ret, (prevVal, retVal) => {
          if (!prevVal) {
            return {
              current: retVal,
            }
          }
          return {
            ...prevVal,
            current: prevVal.current + retVal,
          }
        }),
      }
    }
    case FINISH_SERVANT: {
      const { needs } = action
      return {
        ..._.assignWith(state, needs, (prevVal, retVal) => {
          if (!prevVal) {
            return {
              current: 0,
            }
          }
          return {
            ...prevVal,
            current: prevVal.current - retVal,
          }
        }),
      }
    }
    default:
      return state
  }
}

function servantItem(state, action) {
  switch (action.type) {
    case FINISH_SERVANT: {
      const {
        level,
        skills,
      } = state
      return {
        ...state,
        level: {
          ...level,
          curr: level.next,
          currAscension: level.nextAscension,
        },
        skills: skills.map(({ next }) => ({
          curr: next,
          next,
        })),
      }
    }
    default:
      return state
  }
}

function servant(state = {}, action) {
  switch (action.type) {
    case SET_SERVANT_INFO:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.value,
        },
      }
    case SELECT_SERVANT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          selected: action.value,
        },
      }
    case REMOVE_SERVANT:
      return _.omit(state, [action.id])
    case IMPORT_DATA:
      return {
        ...state,
        ...action.data.servant,
      }
    case FINISH_SERVANT:
      return {
        ...state,
        [action.id]: servantItem(state[action.id], action),
      }
    default:
      return state
  }
}

function eventItem(state = { active: false, pool: [], finish: false }, action) {
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
    default:
      return state
  }
}

function event(state = {}, action) {
  switch (action.type) {
    case SET_EVENT:
    case SET_EVENT_POOL:
    case FINISH_EVENT:
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

const getAccountData = combineReducers({
  name,
  material,
  servant,
  event,
  config,
})

export default function data(state = { 0: undefined }, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      const newIntId = _.max(
        Object.keys(state).map(v => parseInt(v, 10))) + 1
      const id = `${newIntId}`
      return {
        ...state,
        [id]: getAccountData(undefined, action),
      }
    }
    case SET_ACCOUNT_NAME: {
      const { id } = action
      return {
        ...state,
        [id]: getAccountData(state[id], action),
      }
    }
    case DELETE_ACCOUNT: {
      const next = {
        ...state,
      }
      delete next[action.id]
      return next
    }
    default: {
      const { currentAccountID: id = '0' } = action
      const accountData = getAccountData(state[id], action)
      const next = accountData === state[id] ? state : {
        ...state,
        [id]: accountData,
      }
      return next
    }
  }
}
