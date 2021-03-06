const SET_SERVANT_INFO = 'set_servant_info'
const REMOVE_SERVANT = 'remove_servant'
const FINISH_SERVANT = 'finish_servant'
const SELECT_SERVANT = 'select_servant'

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

function finishServant(id, needs) {
  return {
    type: FINISH_SERVANT,
    id,
    needs,
  }
}

function selectServant(id, value) {
  return {
    type: SELECT_SERVANT,
    id,
    value,
  }
}

export {
  SET_SERVANT_INFO,
  REMOVE_SERVANT,
  setServantInfo,
  removeServant,
  FINISH_SERVANT,
  finishServant,
  SELECT_SERVANT,
  selectServant,
}
