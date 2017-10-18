/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, Platform } from 'react-native'
import KeyboardManager from 'react-native-keyboard-manager'

import setup from './js/setup'

if (Platform.OS === 'ios') {
  KeyboardManager.setToolbarPreviousNextButtonEnable(true)
}

AppRegistry.registerComponent('ChaldeaArchives', setup)
