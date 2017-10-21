/**
 * @flow
 */

import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { Client, Configuration } from 'bugsnag-react-native'

import rootReducer from '../reducers'
import addAccountID from './addAccountID'

import { setBugsnagClient } from '../lib/bugsnag'

const middlewares = [addAccountID]

if (__DEV__ && !!window.navigator.userAgent) {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const migrations = {
  3: (state) => {
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
  version: 3,
  storage,
  migrate: createMigrate(migrations, { debug: true }),
}

const reducer = persistReducer(config, rootReducer)

let bugsnag

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
      ...report.metadata,
      state: { store: store.getState() },
    }
  })
  setBugsnagClient(new Client(configuration))
  return store
}

function getBugsnagClient() {
  return bugsnag
}

export default configureStore
export { getBugsnagClient }
