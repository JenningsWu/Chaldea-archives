/**
 * @flow
 */

import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { Client, Configuration } from 'bugsnag-react-native'

import rootReducer from '../reducers'
import addAccountID from './addAccountID'

const middlewares = [addAccountID]

if (__DEV__ && !!window.navigator.userAgent) {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const migrations = {
  2: (state) => {
    const ids = Object.keys(state.accountData)
    let next = state
    ids.forEach((id) => {
      const action = {
        currentAccountID: id,
        type: 'MIGRATION',
      }
      next = rootReducer(state, action)
    })
    return next
  },
}

const config = {
  key: 'root',
  version: 2,
  storage,
  migrate: createMigrate(migrations, { debug: true }),
}

const reducer = persistReducer(config, rootReducer)

function configureStore(onComplete: Function) {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(...middlewares),
    ),
  )
  persistStore(store, {}, onComplete)
  // if (isDebuggingInChrome) {
  //   window.store = store;
  // }

  const configuration = new Configuration()
  configuration.beforeSendCallbacks.push((report) => {
    report.metadata = {
      state: store.getState(),
    }
  })
  const bugsnag = new Client(configuration)
  return store
}

export default configureStore
