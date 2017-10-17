import { Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'

const params = {}

class PreventSwitchHook {
  constructor() {
    this.prevent = new Map()
  }

  allowSwitch() {
    return this.prevent.size === 0
  }

  register(id, desc) {
    this.prevent.set(id, desc)
  }

  unregister(id) {
    this.prevent.delete(id)
  }

  alert() {
    Alert.alert(
      '',
      `未保存从者信息：\n${this.getError()}\n`,
      [
        {
          text: '确定',
        },
      ],
    )
  }

  getError() {
    return Array.from(this.prevent.values()).join('\n')
  }
}

const hook = new PreventSwitchHook()

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action

  if (!hook.allowSwitch()) {
    hook.alert()
    return null
  }

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
export { hook }
