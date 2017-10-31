/**
* @flow
*/

import React from 'react'
import { TabNavigator } from 'react-navigation'

// import FgoIndex from './fgoIndex'
import FutureSight from './futureSight'
import About from './about'

const App = TabNavigator({
  // FgoIndex: {
  //   screen: FgoIndex,
  // },
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
  swipeEnabled: false,
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
