const SET_SERVANT_INFO = 'set_servant_info'
const REMOVE_SERVANT = 'remove_servant'

function setServantInfo(id, value) {
  return {
    type: SET_SERVANT_INFO,
    id,
    value,
  }
}

function removeServant(id) {
  return {
    type: REMOVE_SERVANT,
    id,
  }
}

export { SET_SERVANT_INFO, REMOVE_SERVANT, setServantInfo, removeServant }
