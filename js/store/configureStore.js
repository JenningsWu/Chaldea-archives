/**
 * @flow
 */

import { compose, /* applyMiddleware, */ createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducers from '../reducers'

function configureStore(onComplete: Function) {
 // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = createStore(
    reducers,
    undefined,
    compose(
      //  applyMiddleware(...),
      autoRehydrate(),
    ),
  )
  persistStore(store, { storage: AsyncStorage }, onComplete)
  // if (isDebuggingInChrome) {
  //   window.store = store;
  // }
  return store
}

export default configureStore
