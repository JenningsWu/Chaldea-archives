/**
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MenuContext } from 'react-native-menu'
import codePush from 'react-native-code-push'

import configureStore from './store/configureStore'
import App from './app'

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

export default function setup(): ReactClass<{}> {
  class Root extends Component {

    constructor() {
      super()
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      }
    }

    state: {
      isLoading: boolean;
      store: any;
    }

    render() {
      if (this.state.isLoading) {
        return null
      }
      return (
        <Provider store={this.state.store}>
          <MenuContext style={{ flex: 1 }}>
            <App />
          </MenuContext>
        </Provider>
      )
    }
  }

  return codePush(codePushOptions)(Root)
}
