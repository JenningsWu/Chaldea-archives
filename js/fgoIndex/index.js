/**
 * @flow
 */

import React from 'react'
import {
  Text,
  View,
  Button,
} from 'react-native'
import PropTypes from 'prop-types'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import ServantList from './ServantListWithSearch'
import ServantPage from './ServantPage'

const FgoIndex = ({ navigation }) => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
  }}
  >
    {/* <Text>hello world</Text>
    <Button onPress={() => navigation.navigate('Item', { t: 'a' })} title="Jump" /> */}
    <ServantList navigation={navigation} />
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
  tintColor: PropTypes.string.isRequired,
}

const indexNavigationOptions = {
  tabBarLabel: '图鉴',
  tabBarIcon: TabBarIcon,
}

FgoIndex.navigationOptions = {
  ...indexNavigationOptions,
  title: '图鉴',
}

export default StackNavigator({
  Index: {
    screen: FgoIndex,
  },
  Item: {
    screen: ServantPage,
  },
})
