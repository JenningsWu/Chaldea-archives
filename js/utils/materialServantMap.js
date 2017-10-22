import _ from 'lodash'

import { servantList } from '../assets/export/data/servants'

function generate() {
  const ret = {}
  servantList.filter(s => s && s.isShipped).forEach((s) => {
    const materialToServant = {}
    Array.from(s.calculateFullMaterailNums(true, false)).forEach(
      ([materialId, num]) => {
        materialToServant[materialId] = materialToServant[materialId] || {}
        materialToServant[materialId].numForAscension = num
      },
    )
    Array.from(s.calculateFullMaterailNums(false, true)).forEach(
      ([materialId, num]) => {
        materialToServant[materialId] = materialToServant[materialId] || {}
        materialToServant[materialId].numForSkill = num
      },
    )
    _.forEach(materialToServant, ({ numForSkill = 0, numForAscension = 0 }, id) => {
      ret[id] = ret[id] || []
      ret[id].push({
        id: s.id,
        numForSkill,
        numForAscension,
      })
    })
  })
  return ret
}

export default generate()
