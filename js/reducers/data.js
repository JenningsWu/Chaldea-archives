import _ from 'lodash'
import { combineReducers } from 'redux'
import { SET_MATERIAL_NUM } from '../actions/material'
import { SET_SERVANT_INFO, REMOVE_SERVANT } from '../actions/servant'
import materialList from '../assets/data/materialList'
import config from './config'

const initialMaterialData = _.mapValues(materialList, () => ({
  current: 0,
}))

function name(state = '', action) {
  switch (action.type) {
    // case SET_MATERIAL_NUM:
    //   return {
    //     ...state,
    //     [action.id]: {
    //       ...state[action.id],
    //       current: action.num,
    //     },
    //   }
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
    default:
      return state
  }
}

function servant(state = {}, action) {
  switch (action.type) {
    case SET_SERVANT_INFO:
      return {
        ...state,
        [action.id]: action.value,
      }
    case REMOVE_SERVANT:
      return _.omit(state, [action.id])
    default:
      return state
  }
}

const getAccountData = combineReducers({
  name,
  material,
  servant,
  config,
})

export default function data(state = { 0: undefined }, action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return _.mapValues(state, (v) => getAccountData(v, action))
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
