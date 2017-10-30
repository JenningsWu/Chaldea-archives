import _ from 'lodash'
import events from '../assets/data/event.json'

function getEventNormalMaterialMaximumNum(id, { conditional = 1 }) {
  const ret = {}
  _.forEach(events[id].material, (num, materialId) => {
    ret[materialId] = (ret[materialId] || 0) + num
  })
  if ('conditional' in events[id]) {
    _.forEach(events[id].conditional[conditional], (num, materialId) => {
      ret[materialId] = (ret[materialId] || 0) + num
    })
  }
  return ret
}

function getEventMaterial(id, { pool, conditional = 1, material = {} }) {
  const ret = getEventNormalMaterialMaximumNum(id, { conditional })

  _.forEach(material, (num, materialId) => {
    if (materialId in ret && num < ret[materialId]) {
      ret[materialId] = num
    }
  })

  pool.forEach((pnum, idx) => {
    _.forEach(events[id].pool[idx].material, (num, materialId) => {
      ret[materialId] = (ret[materialId] || 0) + (pnum * num)
    })
  })
  return ret
}


export default events
export {
  getEventNormalMaterialMaximumNum,
  getEventMaterial,
}
