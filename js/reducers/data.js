import _ from 'lodash'
import { REHYDRATE } from 'redux-persist/constants'
import { SET_MATERIAL_NUM } from '../actions/material'
import { SET_SERVANT_INFO, REMOVE_SERVANT } from '../actions/servant'
import materialList from '../assets/data/materialList'

const initialMaterialData = _.mapValues(materialList, () => ({
  current: 0,
}))

function getMaterialData(state = initialMaterialData, action) {
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

function getServantData(state = {}, action) {
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


function getAccountData(state = { name: '' }, action) {
  // if (action.type === REHYDRATE) {
  //   const {in}
  // }
  switch (action.type) {
    // case SET_MATERIAL_NUM:
    //   return
    //   break;
    default: {
      const materialData = getMaterialData(state.material, action)
      const servantData = getServantData(state.servant, action)
      if (materialData === state.material && servantData === state.servant) {
        return state
      }
      return {
        ...state,
        servant: servantData,
        material: materialData,
      }
    }
  }
}

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
