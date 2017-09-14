import { SWITCH_ACCOUNT } from '../actions/account'

export default function account(state = '0', action) {
  switch (action.type) {
    case SWITCH_ACCOUNT:
      return action.to
    default:
      return state
  }
}
