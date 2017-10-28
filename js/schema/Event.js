import _ from 'lodash'
import events from '../assets/data/event.json'

function getEventMaterial(id, { pool, conditional = 1, material = {} }) {
  const ret = {}
  _.forEach(events[id].material, (num, materialId) => {
    const inc = materialId in material ? material[materialId] : num
    ret[materialId] = (ret[materialId] || 0) + inc
  })
  if ('conditional' in events[id]) {
    _.forEach(events[id].conditional[conditional], (num, materialId) => {
      if (!(materialId in material)) {
        ret[materialId] = (ret[materialId] || 0) + num
      }
    })
  }
  pool.forEach((pnum, idx) => {
    _.forEach(events[id].pool[idx].material, (num, materialId) => {
      ret[materialId] = (ret[materialId] || 0) + (pnum * num)
    })
  })
  return ret
}

export default events
export { getEventMaterial }
