const SET_EVENT = 'set_event'
const SET_EVENT_POOL = 'set_event_pool'

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

export {
  SET_EVENT,
  SET_EVENT_POOL,
  setEvent,
  setEventPool,
}
