import { NavigationActions } from 'react-navigation'

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state)
  // you might want to replace 'null' with 'state' if you're using redux (see comments below)
}

export default navigateOnce
