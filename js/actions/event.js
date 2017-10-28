const SET_EVENT = 'set_event'
const SET_EVENT_POOL = 'set_event_pool'
const FINISH_EVENT = 'finish_event'
const SET_CONDITIONAL_VALUE = 'set_conditional_value'
const SET_MATERIAL_NUM = 'set_material_num'

function setEvent(id, value) {
  return {
    type: SET_EVENT,
    id,
    value,
  }
}

function setEventPool(eventId, poolIndex, value) {
  return {
    type: SET_EVENT_POOL,
    id: eventId,
    poolIndex,
    value,
  }
}

function finishEvent(id, event) {
  return {
    type: FINISH_EVENT,
    id,
    event,
  }
}

function setConditionalValue(id, value) {
  return {
    type: SET_CONDITIONAL_VALUE,
    id,
    value,
  }
}

function setMaterialNum(eventId, materialId, value) {
  return {
    type: SET_MATERIAL_NUM,
    id: eventId,
    materialId,
    value,
  }
}

export {
  SET_EVENT,
  SET_EVENT_POOL,
  FINISH_EVENT,
  SET_MATERIAL_NUM,
  SET_CONDITIONAL_VALUE,
  setEvent,
  setEventPool,
  finishEvent,
  setConditionalValue,
  setMaterialNum,
}
