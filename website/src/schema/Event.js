import _ from 'lodash'
import events from '../assets/data/event.json'

function getEventMaterial(id, pool) {
  const ret = {}
  _.forEach(events[id].material, (num, materialId) => {
    ret[materialId] = (ret[materialId] || 0) + num
  })
  pool.forEach((pnum, idx) => {
    _.forEach(events[id].pool[idx].material, (num, materialId) => {
      ret[materialId] = (ret[materialId] || 0) + (pnum * num)
    })
  })
  return ret
}

export default events
export { getEventMaterial }
