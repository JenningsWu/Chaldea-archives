/**
* @flow
*/

import React from 'react'
import {
 StyleSheet,
 Text,
 View,
} from 'react-native'
import { TabNavigator } from 'react-navigation'

import FgoIndex from './fgoIndex'
import FutureSight from './futureSight'
import Event from './event'
import About from './about'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const App = TabNavigator({
  FgoIndex: {
    screen: FgoIndex,
  },
  FutureSight: {
    screen: FutureSight,
  },
  // Event: {
  //   screen: Event,
  // },
  About: {
    screen: About,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
})

export default App

// export default function ChaldeaArchives() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>
//         hello worlda
//       </Text>
//       <Text style={styles.instructions}>
//         To get started, edit index.ios.jsbb
//       </Text>
//       <Text style={styles.instructions}>
//         Press Cmd+R to reload,{'\n'}
//         Cmd+D or shake for dev menu
//       </Text>
//     </View>
//   )
// }
