/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native'
import { Client } from 'bugsnag-react-native'

import setup from './js/setup'

const bugsnag = new Client()
AppRegistry.registerComponent('ChaldeaArchives', setup)
