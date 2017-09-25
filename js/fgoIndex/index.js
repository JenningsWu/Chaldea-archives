/**
 * @flow
 */

import React from 'react'
import {
  View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import ServantList from './servantListWithSearch'
import ServantPage from './servant/servantPage'
import DetailPage from './servant/detailPage'
import indexNavigationOptions from './navigationOptions'
import navigateOnce from '../lib/navigateOnce'

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

const Index = StackNavigator({
  Index: {
    screen: FgoIndex,
  },
  ServantDetail: {
    screen: ServantPage,
  },
  DetailPage: {
    screen: DetailPage,
  },
})

Index.router.getStateForAction = navigateOnce(Index.router.getStateForAction)

export default Index
