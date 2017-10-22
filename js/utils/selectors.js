import _ from 'lodash'
import { createSelector, createStructuredSelector } from 'reselect'

import materialMap from '../assets/export/data/materials'
import { getEventMaterial } from '../schema/Event'

export const materialFutureCalculator = createSelector(
  ({ account, accountData }) => accountData[account].event,
  (event) => {
    const ret = _.mapValues(materialMap, () => 0)
    _.forEach(event, ({ active, pool }, id) => {
      if (active) {
        _.mergeWith(ret, getEventMaterial(id, pool), (v1, v2) => v1 + v2)
      }
    })
    return ret
  },
)

export const materialCurrentCalculator = createSelector(
  ({ account, accountData }) => accountData[account].material,
  list => _.mapValues(list, ({ current }) => current),
)

export default 'selectors'
