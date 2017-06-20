/**
 * @flow
 */

import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const FgoIndex = (/* { navigation }*/) => (
  <View>
    <Text>hello world</Text>
  </View>
)

const TabBarIcon = ({ tintColor }) => (
  <Icon
    name="book"
    size={20}
    style={{ color: tintColor }}
  />
)

TabBarIcon.propTypes = {
  tintColor: React.PropTypes.string.isRequired,
}

FgoIndex.navigationOptions = {
  tabBarLabel: '图鉴',
  tabBarIcon: TabBarIcon,
}

export default FgoIndex
