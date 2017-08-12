/**
 * @flow
 */

import React from 'react'
import {
  View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import ServantList from './ServantListWithSearch'
import ServantPage from './ServantPage'
import indexNavigationOptions from './navigationOptions'

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
