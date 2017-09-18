import { NavigationActions } from 'react-navigation'
import _ from 'lodash'

const params = {}

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action

  if (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName &&
    routeName === 'ServantDetail' &&
    _.get(action, ['params', 'id'], params) !== _.get(state.routes[state.routes.length - 1], ['params', 'id'], params)
  ) {
    return getStateForAction({
      type: NavigationActions.SET_PARAMS,
      key: state.routes[state.routes.length - 1].key,
      params: _.get(action, ['params'], params),
    }, state)
  }

  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state)
  // you might want to replace 'null' with 'state' if you're using redux (see comments below)
}

export default navigateOnce
