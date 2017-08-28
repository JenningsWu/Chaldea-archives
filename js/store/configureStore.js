/**
 * @flow
 */

import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import createLogger from 'redux-logger'

import reducers from '../reducers'
import addAccountID from './addAccountID'

const middlewares = [addAccountID]

if (__DEV__ && !!window.navigator.userAgent) {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

function configureStore(onComplete: Function) {
 // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(...middlewares),
      autoRehydrate({ log: true }),
    ),
  )
  persistStore(store, {
    storage: AsyncStorage,
    // blacklist: ['accountData'],
  }, onComplete)
  // if (isDebuggingInChrome) {
  //   window.store = store;
  // }
  return store
}

export default configureStore
