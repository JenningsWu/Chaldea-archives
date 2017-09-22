const SET_EVENT = 'set_event'
const SET_EVENT_POOL = 'set_event_pool'
const FINISH_EVENT = 'finish_event'

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

function finishEvent(id, pool = []) {
  return {
    type: FINISH_EVENT,
    id,
    pool,
  }
}

export {
  SET_EVENT,
  SET_EVENT_POOL,
  FINISH_EVENT,
  setEvent,
  setEventPool,
  finishEvent,
}
